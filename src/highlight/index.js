import classes from './index.module.css';

const Highlight = ({children, text}) => {
  const index = children.toLowerCase().indexOf(text.toLowerCase());
  if (index >= 0) {
    return (
      <>
        {children.substring(0, index)}
        <span className={classes.highlight}>{children.substring(index, index + text.length)}</span>
        {children.substring(index + text.length)}
      </>
    )
  }
  return children
}

export default Highlight;
