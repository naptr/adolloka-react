import styles from '../../styles/Logo/InlineLogo.module.css';

const InlineLogo = (props) => {
  return (
    <>
      <span 
        className={styles.logo} 
        style={{
           fontSize: `${props.fontSize}em`, 
           fontWeight: `${props.fontWeight}`, 
           color: `#${props.fontColor}`
          }}>adolloka</span>
    </>
  )
};

export default InlineLogo;