import * as React from 'react'
import { connect } from 'utils'
import * as cs from "classnames"

const styles = {
  wrapper: {
    width: "100%",
    position: "relative",
  },
  validMsg: {
    position: "absolute",
    top: "100%",
    color: "red",
    fontSize: 12,
    paddingTop: 3,
  },
  input: {
    border: "2px solid #dddddd",
    background: '#fff',
    height: 40,
    padding: '0 10px',
    verticalAlign: 'middle',
    lineHeight: "normal",
    color: '#182026',
    fontSize: 16,
    fontWeight: 400,
    appearance: 'none',
    "&::placeholder": {
      color: 'rgba(92,113,128,0.5)'
    }
  },
  label:{
    height: 18,
    lineHeight: "18px",
    fontSize: 15,
    color: "#89949a",
    marginBottom: 10,
  },
  invalid: {
    border: "2px solid red",
    outline: "red",
  },
  disabled: {
    backgroundColor: "#f7f7f7",
  }
}

interface Props {
  type: string;
  name: string;
  placeholder: string;
  value?: string
  onChange: (name: string, value: string)=> void;
  className?: string
  label?: string
  validMsg?: string
}

const Input: React.SFC<Props&WithStyles> = ({type, name, onChange, classes, placeholder, className, disabled, label, value, validMsg}) => {
  let changeHandler = onChange?({target:{name,value}}: React.changeEvent<HTMLInputElement>)=>onChange(value,name):null
  const input = (
   <div className={classes.wrapper}>
    <input
      type={type}
      value={value}
      name={name}
      placeholder={placeholder}
      onChange={changeHandler}
      className={cs(
        classes.input,
         {
           [className]: !label,
           [classes.invalid]: !validMsg,
           [classes.disabled]: disabled
         }
       )}
      disabled={disabled}
    />
    <div className={classes.validMsg}>{validMsg}</div>
    </div>
  )
  return label?<label className={cs(className)}><div className={classes.label}>{label}</div>{input}</label>:input
 }
                       
Input.defaultProps = {
  type: "text"
}

export default connect<Props>(Input, {styles})
