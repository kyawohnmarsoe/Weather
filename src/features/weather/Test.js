import React from 'react'
import styles from "./Weather.module.css"
import Moment from 'react-moment'
import moment from 'moment'
// import 'moment/locale/fr';
// Moment.globalFormat = 'D MMM YYYY';
function Test() {
  
    return (
        <div >
            {/* <Moment unix locale="lt">{1607813850}</Moment> */}
           

            {moment(1607208863 * 1000).format()}
            <h1>Open Weather</h1>

            <input type="text"
            value="test"
            
            />

            <button 
            aria-label="Search By City"
             >
            Search</button>
            
                <div className={styles.weatherBox}>
                    <span className={styles.cityname}>Test</span>
                    <div className={styles.row}>
                        <div>
                            <img src="http://openweathermap.org/img/wn/02d.png" alt="Weather Icon" className={styles.icon}/>
                            <span className={styles.description}>Test</span>
                        </div>
                        <span className={styles.deg}>Test</span>
                        <div className={styles.windBox}>
                            <span>Wind:Test</span> 
                            <span>Sunrise: {moment(1607813850).format('LT')} </span> 
                            <span>Sunset:Test {moment(1607813850).format('LT')}</span> 
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div>
                            <span >Test</span>
                            <img src="http://openweathermap.org/img/wn/02d.png" alt="Weather Icon" className={styles.icon}/>
                            <span >Test</span>
                        </div>
                        <div>
                            <span >Test</span>
                            <img src="http://openweathermap.org/img/wn/02d.png" alt="Weather Icon" className={styles.icon}/>
                            <span >Test</span>
                        </div>
                        <div>
                            <span >Test</span>
                            <img src="http://openweathermap.org/img/wn/02d.png" alt="Weather Icon" className={styles.icon}/>
                            <span >Test</span>
                        </div>
                        <div>
                            <span >Test</span>
                            <img src="http://openweathermap.org/img/wn/02d.png" alt="Weather Icon" className={styles.icon}/>
                            <span >Test</span>
                        </div>
                        <div>
                            <span >Test</span>
                            <img src="http://openweathermap.org/img/wn/02d.png" alt="Weather Icon" className={styles.icon}/>
                            <span >Test</span>
                        </div>

                    </div>
                </div>
           
        </div>
    )
}

export default Test
