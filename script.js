const audioToggle = document.querySelector('#audio-toggle');
const audioCheck = document.querySelector('#audio-check');
const radios = document.querySelectorAll('.settings [type="radio"]');
const toggles = document.querySelectorAll('.settings [type="checkbox"]');
const docs = document.documentElement;
let isAudioPlayable;
const settings = [
     {
          key: 'sound',
          default: 'false',
     },
     {
          key: 'motion',
          default: 'true',
     },
     {
          key: 'round',
          default: 'false',
     },
     {
          key: 'theme',
          default: 'system',
     },
     {
          key: 'customColor',
          default: 'accent2',
     },
];
function updateSettingsUi({name,value}){
     if(value === 'true' || value === 'false'){
          const checkbox = document.querySelector(`[name="${name}"]`);
          return (checkbox.checked = value === 'true' ? true : false);
     }
     const radio = document.querySelector(`#${value}`);
     return (radio.checked = true);
}
function updateSiteUi({name,value}){
     if(name === 'customColor'){
          docs.style.setProperty('--customColor',`var(--${value})`);
     }
     return (docs.dataset[name] = value);
}
function playAudio(type){
     if(isAudioPlayable){
          const audioSound = type === 'check' ? audioCheck : audioToggle;
          audioSound.currentTime = 0;
          audioSound.play();
     }
}
window.addEventListener('DOMContentLoaded',() => {
     settings.forEach((setting) => {
          const value = localStorage.getItem(setting.key) ?? setting.default;
          updateSiteUi({name: setting.key,value});
          updateSettingsUi({name: setting.key,value});
          if(setting.key === 'sound'){
               isAudioPlayable = value === 'true' ? true : false;
          }
     });
});
toggles.forEach((toggle) => {
     toggle.addEventListener('change',(event) => {
          const {name,checked} = event.target;
          updateSiteUi({name,value: checked});
          localStorage.setItem(name,checked);
          if(name === 'sound') isAudioPlayable = checked;
          playAudio('toggle');
     });
});
radios.forEach((radio) => {
     radio.addEventListener('change',(event) => {
          const {name,id} = event.target;
          updateSiteUi({name,value: id});
          localStorage.setItem(name,id);
          playAudio('check');
     });
});