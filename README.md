# domovoy



Installation bluetooth :
 -> sudo apt-get install pulseaudio pulseaudio-module-bluetooth
 -> reboot
 -> pair and connect

Output to bluetooth :
 -> sudo apt-get install bluez-tools
 -> bt-device -l : list all devices
 -> sudo apt-get install blueman ??


TTS : use of say.js, need of Festival on linux 
 -> sudo apt-get install festival festvox-kallpc16k
 -> download voices here : http://festvox.org/festival/downloads.html
 -> install the -m here : /usr/share/festival/voices/english/
 -> find out name of voice : festival > voice_ (use tab for autocomplete)
 -> sudo apt-get install flite
 -> list voices : apt-cache search festvox-*
 -> mbrola pour raspberry pi http://www.pobot.org/Synthese-vocale-avec-espeak-et.html?lang=fr
 -> festival install voices : http://ubuntuforums.org/showthread.php?t=751169

Explications pocketsphinx on raspberry pi : https://wolfpaulus.com/journal/embedded/raspberrypi2-sr/
NPM module to use (or adapt ?) : https://github.com/eiriksm/pocketsphinx-continuous-node
