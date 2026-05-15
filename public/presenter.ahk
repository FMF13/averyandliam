#Requires AutoHotkey v2.0
#SingleInstance Force

; ============ EDIT THESE TWO LINES ============
URL  := "https://example.com"
PPTX := "C:\path\to\presentation.pptx"
; ==============================================

CheckSchedule()
SetTimer(CheckSchedule, 30000)

CheckSchedule() {
    static lastFired := ""
    today := FormatTime(, "yyyyMMdd")
    hour  := FormatTime(, "HH")
    min   := FormatTime(, "mm")
    dow   := A_WDay  ; 1=Sun ... 7=Sat
    if (dow >= 2 && dow <= 6 && hour = "09" && min = "00" && lastFired != today) {
        lastFired := today
        LaunchEdge()
    }
}

global edgeHwnd := 0

LaunchEdge() {
    global URL, edgeHwnd
    before := WinGetList("ahk_exe msedge.exe")
    Run('msedge.exe --app="' URL '"')
    deadline := A_TickCount + 10000
    while (A_TickCount < deadline) {
        Sleep 200
        for hwnd in WinGetList("ahk_exe msedge.exe") {
            isNew := true
            for old in before {
                if (hwnd = old) {
                    isNew := false
                    break
                }
            }
            if (isNew) {
                edgeHwnd := hwnd
                WinActivate("ahk_id " edgeHwnd)
                Sleep 800
                Send "{F11}"
                return
            }
        }
    }
}

LaunchPowerPoint() {
    global PPTX
    pf   := EnvGet("ProgramFiles")
    pf86 := EnvGet("ProgramFiles(x86)")
    candidates := [
        pf   "\Microsoft Office\root\Office16\POWERPNT.EXE",
        pf86 "\Microsoft Office\root\Office16\POWERPNT.EXE",
        pf   "\Microsoft Office\Office16\POWERPNT.EXE",
        pf86 "\Microsoft Office\Office16\POWERPNT.EXE"
    ]
    for path in candidates {
        if FileExist(path) {
            Run('"' path '" /S "' PPTX '"')
            return
        }
    }
    MsgBox("POWERPNT.EXE not found — edit LaunchPowerPoint() in the script.")
}

F9:: ShowPowerPoint()
F10:: ShowEdge()

ShowPowerPoint() {
    if WinExist("ahk_class screenClass")
        WinActivate("ahk_class screenClass")
    else
        LaunchPowerPoint()
}

ShowEdge() {
    global edgeHwnd
    if (edgeHwnd && WinExist("ahk_id " edgeHwnd))
        WinActivate("ahk_id " edgeHwnd)
    else
        LaunchEdge()
}
