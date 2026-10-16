import styles from './Sidebar.module.css'
import Logo from "../Logo/Logo";

import

function Sidebar(){
    return (
        <div className={styles.sidebar}>
            <Logo size={120} className={styles.logo} />
            <div>
                <div className="list-item">
                </div>
            </div>
        </div>
    )
} 

export default Sidebar