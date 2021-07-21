### 1. What is the difference between Component and PureComponent? give an example where it might break my app.

PureComponent has predefined shouldComponentUpdate lifecycle method, which can't be overridden.
It executes shallow comparison of prevState and prevProps to current state and props. 
If they are identical, component won't be re-rendered.
If we pass reference type variable, which is defined in render method (that means, that it will be created every time parent component re-renders),
comparison will always return true and child component will rerender even though the values of object or array is not changed.
This will lead to extra checks on every re-render, which will always return true. So we're adding extra checks with no benefit

### 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

If we check prevProps and current props for context in shouldComponentUpdate, they'll be the same, because they always point to the same context object.

### 3. Describe 3 ways to pass information from a component to its PARENT.
    1. Create function in parent component and pass it to child components. Child will call the function with values needed;
    2. Use forwardRef. Create ref in parent component and pass it to child using forwardRef. Add ref to element (Input element). Get value in parent using reg.current.value;
    3. Use context or any other state management. Store something in context from child component and get it from context in parent

### 4. Give 2 ways to prevent components from re-rendering.

Use PureComponent or override shouldComponentUpdate in React.Component.
For hooks, React.memo function is combination of PureComponent and shouldComponentUpdate. If we pass second parameter, we can write custom comparator. Otherwise, it will work like PureComponent

### 5. What is a fragment and why do we need it? Give an example where it might break my app.

We have restriction in JSX, that we can have only one parent element. If we don't want to write extra html elements we can use Fragment to avoid this restriction and not to render extra elements in DOM.

### 6. Give 3 examples of the HOC pattern.

HOC is used for extending the functionality of a component
    
    1. I used HOC for displaying error messages from server. I have defined http interceptors in HOC and listening to all responses from server. If something was wrong I was displaying nice toast messages
    2. connect from react-redux actually is HOC
    3. HOC is used to build reusable components. If we want to render different data of same structure with same component, we can wrap it with HOC and pass data. Otherwise, we will need to create 2 separate components with same logic

### 7. what's the difference in handling exceptions in promises, callbacks and async...await.

When using .then or .catch on promise, if promise was resolved callback function of .catch will be automatically executed with error object

async - await also works for promises, but it allows avoiding nested blocks. It gives ability of using async tasks like synchronously. 
We need to use try - catch block to handle exceptions. All rejected promises will be handled in catch block

When using callback functions, we need to pass error object as a parameter to callback function and handle it in callback.
Common structure of callback function is: 
```javascript
callback(error, data) => { 
    if(error) {
        // handle error
        return;
    }
    // handle success
}
```
### 8. How many arguments does setState take and why is it async.
setState is async, because it needs to group all setState instructions on rerender. If we imagine its sync, this will mean, that if we have several setState during re-render, component will re-render as many times as many setStates we have.

Second parameter is callback function, which is executed once state is updated and components re-renders.

### 9. List the steps needed to migrate a Class to Function Component.

1. First, we need to create states using useState. Other options is to use useReducer and name variables [state, setState]. It won't change logic too much;

2. Copy all functions and remove "this" keywords everywhere.

3. return jsx from render() function from component function.

4. copy everything from componentDidMount to useEffect(() => {}, []);

5. if we have logic in componentDidUpdate, we can use useEffect without second parameter, but it will be better to split logic in multiple useEffects

### 10. List a few ways styles can be used with components.

1. Create css files for each component
    1. If we use css modules it will be scoped only to current component
    2. Without modules, all classes will be global and they won't be scoped to current component
    
2. Define class objects in separate js files
3. Use one css file for all classes
4. Use ready template engines like tailwind. You don't need to write any css. You just use existing classes. At build time you can remove unused css to have bundle optimization

### 11. How to render an HTML string coming from the server.

We can use dangerouslySetInnerHTML attribute
