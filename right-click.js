class RightClick {
  
  constructor() { }
  
  static unClick(preventDefault = false){
    if (window.hasBeenUnClicked) throw new Error('The RightClick.unClick() method has been called more than one time.')
    if (!window.hasBeenUnClicked) window.hasBeenUnClicked = true
    if (preventDefault) window.addEventListener('contextmenu', (e)=>e.preventDefault())
    window.addEventListener('click', ()=> document.querySelector('#rc-main')?.remove())
    window.addEventListener('contextmenu', (e) => document.querySelector('#rc-main')?.remove())
    RightClick.UseGlobalDefault()
  }
  
  static globalSettings = {
    color: '#efe',
    width: '300px',
    font_size: '18px',
    hover: '#dadada30',
    font_family: 'arial',
    background: '#0d0d0d'
  }
  
  static setGlobalSettings(settings){
    if(typeof(settings) != 'object') throw new Error('Wrong given type')
    for (let key in settings){
      if(!RightClick.globalSettings.hasOwnProperty(key)) throw new Error(`Wrong given name '${key}', allowed names are:\n` + 
        Object.keys(RightClick.globalSettings).join('\t'))
      if(!(typeof settings[key] == 'string' || settings[key] instanceof String)) throw new Error(`the value of ${key} most to be a string.`)
      if(settings[key].match(/[;]/)) throw new SyntaxError(`The value of ${key} match with some ';' and these aren't allowed.`)
    }
    for (let key in settings) RightClick.globalSettings[key] = settings[key]
  }
  
  static UseGlobalDefault(){
    let cssText = '{'
    for (let key in RightClick.globalSettings){
      if (key == 'width' || key == 'hover') continue
      cssText += `${key.replaceAll('_','-')}:${RightClick.globalSettings[key]}; `
    }
    cssText += `position: fixed; width: calc(${RightClick.globalSettings['width']} - 10px); padding: 5px; margin: 0; display: block; height: unset;}`
    var STYLE_ID = 'rc-style'
    let style = document.createElement('style')
    style.setAttribute('id', STYLE_ID)
    document.body.appendChild(style)
    style = document.getElementById(STYLE_ID)
    style.sheet.insertRule( '#rc-main' + cssText)
    style.sheet.insertRule( '#rc-main .rc-option' + '{ padding: 2px 16px; width: unset; height: unset; display: block; margin: 0; text-align: left; background: inherit;}')
    style.sheet.insertRule( '#rc-main .rc-option:hover' + `{ cursor: pointer; background-color: ${RightClick.globalSettings['hover']}; }`)
  }
  
  setOption(...options){
    /** @ARGs { id text function } */
    for (let el of options) {
      let elKeys = Object.keys(el)
      let rigthLength = elKeys.length == 3
      if (!rigthLength) throw new Error(`The current element need to content an Object named only with: \nid, text, function`)
      let rigthNames = elKeys.includes('id') && elKeys.includes('text') && elKeys.includes('func')
      if (!rigthNames) throw new Error('Some Unallowed names were given, allowed ones are :\nid, text, function')
      let rigthTypes =  (typeof(el['id']) == 'string' || el['id'] instanceof String) && (typeof(typeof(el['text'])) == 'string' || typeof(el['text']) instanceof String) && typeof(el['func']) == 'function'
      if (!rigthTypes) throw new TypeError('The expected types are..\nid:\tString\ntext:\tString\nfunc:\tFunction')
      if(el['id'].match(/[^0-9a-zA-Z-_]/)) throw new SyntaxError('The id need to content only alphanumeric chars and \'-\'.')
    }
    this.options = options 
   }
   
  whenClick(event){
    event.preventDefault()
    event.stopPropagation()
    let oldContexMenu = document.querySelector('#rc-main')
    if(oldContexMenu) oldContexMenu.remove()
    let numOfOptions = 1
    let heightOfOption = 25
    let widthOfContexMenu = 300
    let totalPaddingOfContexMenu = 10
    let cursorPositionX = event.clientX
    let cursorPositionY = event.clientY
    let avaliableWidth = window.innerWidth
    let avaliableHeight = window.innerHeight
    let heightOfContexMenu = (numOfOptions * heightOfOption) + totalPaddingOfContexMenu 
    let mainCssProps = []
    if((avaliableWidth - cursorPositionX) > widthOfContexMenu){
      mainCssProps.push(['left', cursorPositionX])
    } else {
     mainCssProps.push(['right', (avaliableWidth - cursorPositionX)])
    }
    if (avaliableHeight - cursorPositionY > heightOfContexMenu) {
      mainCssProps.push(['top', cursorPositionY])
    } else {
       mainCssProps.push(['bottom', (avaliableHeight - cursorPositionY)])
    }
    let cssText = ''
    for (let el of mainCssProps) { cssText += `${el[0]}:${el[1]}px;` }
    let main = document.createElement('div')
    main.setAttribute('id', 'rc-main')
    main.setAttribute('style', cssText)
    this._options.forEach((el, i) => {
      let option = document.createElement('div')
      option.setAttribute('class', 'rc-option')
      option.setAttribute('id', el.id)
      option.textContent = el.text
      let tempFunc = () => {
        let userFunc = el.func
        userFunc(this)
        let oldContexMenu = document.querySelector('#rc-main')
        if (oldContexMenu) oldContexMenu.remove()
      }
      option.addEventListener('click', tempFunc, {once:true})
      main.appendChild(option)
    })
    window.setTimeout(() => document.body.appendChild(main), 1)    
  }
  
  listen(selector, all = false){
    if(!this.options) throw new Error('No options has been set ')
    let isString = (typeof selector == 'string' || selector instanceof String) 
    if (isString && all === false) {
      let element =  document.querySelector(selector)
      element.addEventListener('contextmenu', this.whenClick)
      element._options = this.options
    } else if (isString && all === true) {
      let elements = document.querySelectorAll(selector)
      for (let element of elements) {
        element.addEventListener('contextmenu', this.whenClick)
        element._options = this.options
      }
    } else if(selector instanceof Array){
      for (let element of selector) {
        element.addEventListener('contextmenu', this.whenClick)
        element._options = this.options
      }
    }else {
      selector.addEventListener('contextmenu', this.whenClick)
      selector._options = this.options
    }
  }
  
}
