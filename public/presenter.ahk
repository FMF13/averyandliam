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
    Run('msedge.exe --app="' URL '"')
    Sleep 2500
    try {
        if (WinGetProcessName("A") = "msedge.exe")
            edgeHwnd := WinGetID("A")
    }
    Sleep 300
    if (edgeHwnd)
        Send "{F11}"
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
    if (edgeHwnd && WinExist("ahk_id " edgeHwnd)) {
        WinActivate("ahk_id " edgeHwnd)
        Sleep 200
        try {
            if (WinGetStyle("ahk_id " edgeHwnd) & 0xC00000)
                Send "{F11}"
        } catch {
            edgeHwnd := 0
            LaunchEdge()
        }
    } else {
        LaunchEdge()
    }
}
