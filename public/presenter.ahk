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

LaunchEdge() {
    global URL
    Run('msedge.exe --new-window --start-fullscreen "' URL '"')
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
    if WinExist("ahk_exe msedge.exe")
        WinActivate("ahk_exe msedge.exe")
    else
        LaunchEdge()
}
