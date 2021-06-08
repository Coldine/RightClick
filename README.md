# Rigth Click

This project consists of a class to facilitate the creation of context menus, thanks to a single class and a few static properties.

Its use is simple so it is **NOT** recommended to use it for large projects unless you are sure what are you doing in that case try to modify the class (which is not very big or complicated).

## Getting starting 🌆

To use it, copy and paste the content of the file from [here](https://raw.githubusercontent.com/Coldine/RightClick/main/right-click.js).

## Use 🌇

To see an example visit the example [file](https://github.com/Coldine/RightClick/blob/main/example.html).


### setGlobalSettings( Object: _Required_ ) :_Optional_

The _static_ **setGlobalSettings** change the view of the context menu and gets an Object with the some few properties as  argument.
these are presents in the static **globalSettings** and if you need make it accept another names these ones need to be added manually to the static globalSettings of the class, you can change one or several, default allowed names are:

* color
* width
* font_size
* hover
* font_family
* background

**Note 1**: _The **hover** name define the color to the :hover pseudo-class_

**Note 2**: _Use the setGlobalSettings is optional, but if you use it you need to pass a valid argument_.

Example

To use some color, background and hover diferent to the given in the default Global Settings.
```
  RightClick.setGlobalSettings( {
    color: '#000' ,
    background: '#fff' ,
    hover: '#0000ff40'
  } )
```

### unClick(Boolean: _Optional_ ) :_Required_
The _static_ **unClick** detect when the context menu need to to be deleted and set the styles to the correct view of the context menu.

**Note**: _Default value is false_.

Example:

If I just want show my custom context menus and no show the given ones by sistem. 
```
  RightClick.unClick(true)
```
### setOption(...Object: _Required_ ) :_Required_
The **setOption** method set witch options need to be displayed when teh user call a context menu, this method use one or several Objects with the next three names/properties:

* id  
* text  
* func  

**id**: A string with the id that will have the context menu option

**text**: A string with the text that will be displayed on the context menu option

**func**: The action that will be done when the users click on the context menu option

Example:

If I want to show the option 'I am the Option 1' ans throw an alert with the massagge 'You clicked the option 1' when the user click over the option. 
```
  let rightClick = new RightClick()
  
  rightClick.setOption( {
    id: 'option1',
    text: 'I am the Option 1',
    func: () => {
      alert('You clicked the option 1')
    }
  } )
```
**Note**: The func property gets as argument the element rightClicked. This can be optionaly captured and used just like to use a event in a eventListener, Example:

```
[...]
  func: (rightClickedElement) => {
    alert( rightClickedElement.value )
  }
[...]
```  

### listen(DOM-Element || String || Array :_Required_, Boolean:_Optional_) :_Required_
The **listen** method define witch element(s) will display the current context menu.

The first argument can be one of the nexts: 

* DOM-Element
* String
* Array

And the second is an optional Boolean that indicates if the selector need use querySelectorAll or querySelector, if the argument is true will use querySelectorAll, if the argument is false will use querySelector.

**Note**: _Default value is false_.

**DOM-Element**: A element of the DOM.

Example 1

The custom context menu will show itself when the user press rigth click on the next element

```<p id="my-id" > Lorem ipsum dolor </p> ```

```
  let rightClick = new RightClick()
  rightClick.listen( document.getElementById('my-id'))
```

**String**: A string with the selector to be used 

Example 2

The custom context menu will show itself when the user press rigth click on the first element with class 'one' 

```
  let rightClick = new RightClick()
  rightClick.listen('.one') // use querySelector
```

Example 2.5

The custom context menu will show itself when the user press rigth click on any element with class 'two' 

```
  let rightClick = new RightClick()
  rightClick.listen('.two', true) // use querySelectorAll
```

**Array**: Every element in the Array need to be a DOM-Element 

Example 3

The custom context menu will show itself when the user press rigth click on any element with class 'few' or class 'less'

```
  let few = document.querySelectorAll('.few')
  let less = document.querySelectorAll('.less')
  let both = [...few, ...less]
  both = [... new Set(both)] // to prevent duplicate values
  
  let rightClick = new RightClick()
  rightClick.listen( both )
```

## Advice 🌃

The good way use the class is the next, because make easy to read the code and separete the parts:

```
  RightClick.setGlobalSettings() //optional
  RightClick.unClick()
  
  let rightClick = new RightClick()
  rightClick.setOption(...)
  rightClick.listen(...)
  
  let rightClick2 = new RightClick()
  rightClick2.setOption(...)
  rightClick2.listen(...)
  
  let rightClick3 = new RightClick()
  rightClick3.setOption(...)
  rightClick3.listen(...)
```

## thanks 🌌 
