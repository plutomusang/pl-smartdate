import './smartdate.css'
import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';

export const SmartDate = ({value}) => {
    

    const [selDate, setSelDate] = useState (assignDate(value));
    const [curMonth, setCurMonth] = useState (assignDate(value).getMonth() + 1);
    const [curYear, setCurYear] = useState (assignDate(value).getFullYear());
    const [dayValues, setDayValues] = useState([]);
    const [monthValues, setMonthValues] = useState([]);
    const [monthOpen, setMonthOpen] = useState(false);
    // const dateChange = useCallback();
    // Id generator
    function assignID() {
        return Math.floor(Math.random() * Date.now())
    }
    //----------------------------------------------------------------------------
    function assignDate (d){
        var vd = new Date(d);
        // alert(d);
        if (isValidDate(vd)) {
            
            return vd;
        } else {
            return new Date(Date.now());
        }
    }
    //----------------------------------------------------------------------------
    function isValidDate (d){
        let ret = false;
        if (Object.prototype.toString.call(d) === "[object Date]") {
            // it is a date
            if(isNaN(d)) {
                //date is not valid        
                ret = false;
            } else {
                //date object is valid
                ret = true;
            }
        } 
        return ret;
    }
    //----------------------------------------------------------------------------
    const getMonthLabel =(m)=>{
        let _mnthName = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return _mnthName[m]
    };

    useEffect( () =>{
        dayPropagation(curMonth, curYear, selDate);
        monthPropagation(curMonth);
    });
    //----------------------------------------------------------------------------
    const dayPropagation= (month, year, seldate) => { 
        let _daysInMonth = new Date(year, month, 0).getDate();
        let _dayName =  ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
        let _dayValues = [];

        let i = 1 ;
        
        for (i = 1; i <= _daysInMonth; i++) {
            var output = year + '/' + (month < 10 ? '0' : '') + month + '/' + (i < 10 ? '0' : '') + i;
            var md = new Date(output);

            var activelabel = " ";
            if(seldate.getFullYear() === md.getFullYear()) {
                if(seldate.getMonth() === md.getMonth()) {
                    if (seldate.getDate() === md.getDate())  activelabel =" activelabel";
                }
            }
            
            
            var _className =  "days";
            if (md.getDay() === 0) _className =  "days sundaycolor" ;
            _className = _className + activelabel;

            let _dayValue = {
                day : i,
                dayName  : _dayName[md.getDay()] ,
                className: _className,
                value  : output
              };
            
            _dayValues.push(_dayValue)
    
        }

        setDayValues(_dayValues);

    };
    //----------------------------------------------------------------------------
    const monthPropagation =(month) => {

        let i = 1;
        let _monthValues = [];

        for (i = 1; i < 13; i++) {
            let  _className = "monthName";
            if (i === month) _className = "monthName active_month";

            let _monthValue = {
                month : i,
                monthName  : getMonthLabel(i),
                className: _className
              };
            _monthValues.push(_monthValue);
        }
        setMonthValues(_monthValues)
    }
    //----------------------------------------------------------------------------
    const onClick_NewDate =(mNewCurDate)=> { 
        let _curdate = new Date(mNewCurDate);        
        setSelDate(_curdate);
        dayPropagation(curMonth, curYear, _curdate);
        setMonthOpen (false);
        // dateChange();
    }
    //----------------------------------------------------------------------------
    const onClick_NewMonth =(mNewMonth) => {
        setCurMonth(mNewMonth);
        dayPropagation(mNewMonth, curYear, selDate);
        setMonthOpen (false);
        monthPropagation(mNewMonth);
    }
    //----------------------------------------------------------------------------
    const onClick_checkbox =() => {
        let _b = !monthOpen;
        setMonthOpen(_b);
    }
    //----------------------------------------------------------------------------
    const onClick_downButton=() => {
        let _curYear = curYear - 1;
        setCurYear(_curYear );
        dayPropagation(curMonth,_curYear,selDate);
        setMonthOpen(false);
    }
    //----------------------------------------------------------------------------
    const onClick_upButton=() => {
        let _curYear = curYear + 1;
        setCurYear(_curYear );
        dayPropagation(curMonth,_curYear,selDate);
        setMonthOpen(false);
    }
    return (
        <div className="smartdate">
        <div className="year">
            <div className="yearlabel">Yr {curYear } </div>
            <div className="updown">
                <div className="udcontainer">
                    <svg  className="updownarrow up" width="5.5562mm" height="3.9686mm" viewBox="0 0 555.62 396.86" onClick={onClick_upButton}>
                        <polygon className="fil0 " points="277.82,96.94 480.8,299.92 74.84,299.92 "/>
                    </svg>
                    <svg  className="updownarrow" width="5.5562mm" height="3.9686mm"viewBox="0 0 555.62 396.86" onClick={onClick_downButton}>
                        <polygon className="fil0 " points="277.81,299.93 480.79,96.95 74.83,96.95 "/>
                    </svg>

                </div>

            </div>
        </div>
        <div className="month">
            <input type="checkbox" id={"activatorid" + assignID} className="activator" onClick={onClick_checkbox} checked={monthOpen}/>
            <label for={"activatorid" + assignID} className="activator-label">
                <div className="monthlabel vmiddle">{getMonthLabel(curMonth)}</div>
                <div className="arrowright">
                    <svg  width="6.2835mm" height="5.953mm" 
                    viewBox="0 0 3174.98 2645.82"
                    className="indicator" >
                    <path className="lightlayer" d="M1110.85 1843.49l0 -1048.75c0,-18.46 9.18,-34.31 25.2,-43.49 16.02,-9.17 34.34,-9.09 50.27,0.25l894.92 524.37c15.78,9.25 24.78,24.95 24.78,43.25 0,18.29 -8.99,34 -24.78,43.25l-894.92 524.37c-15.93,9.33 -34.25,9.42 -50.27,0.24 -16.02,-9.18 -25.2,-25.03 -25.2,-43.49z" />
            
                    <g className="darklayer">
                    <path 
                        className="dark1" 
                        d="M280.01 1828.36l0 -1048.75c0,-18.46 9.18,-34.31 25.2,-43.49 16.02,-9.17 34.34,-9.09 50.27,0.25l894.92 524.37c15.78,9.25 24.78,24.96 24.78,43.25 0,18.29 -8.99,34 -24.78,43.25l-894.92 524.37c-15.93,9.33 -34.25,9.42 -50.27,0.24 -16.02,-9.18 -25.2,-25.03 -25.2,-43.49z"/>
                    <path 
                        className="dark2" 
                        d="M1941.69 1828.36l0 -1048.75c0,-18.46 9.18,-34.31 25.2,-43.49 16.02,-9.17 34.33,-9.09 50.26,0.25l894.93 524.37c15.78,9.25 24.78,24.96 24.78,43.25 0,18.29 -9,34 -24.78,43.25l-894.93 524.37c-15.93,9.33 -34.24,9.42 -50.26,0.24 -16.02,-9.18 -25.2,-25.03 -25.2,-43.49z"/>
                    </g>                 
                    </svg>
                    

                </div>
            </label>
            <div className="monthView">
                { monthValues.map((values, index) => {
                    return (
                        <div className={values.className} onClick={() => onClick_NewMonth(values.month)}>{values.monthName}</div>
                    );
                    })
                }
            </div>
        </div>  
        <> 
            { dayValues.map((values, index) => {
                    return (
                        <div className={values.className}  onClick={() => onClick_NewDate(values.value)}>
                            <div className="daynum vmiddle">{values.day}</div>
                            <div className="daynum vmiddle">{values.dayName}</div>
                        </div>
                    );

                })
            }
        </>

    </div>
    )
}
SmartDate.prototype = {
    value: PropTypes.string,
    onChange: PropTypes.func,
}

SmartDate.defaultProps = {
    value: (new Date()).toLocaleDateString('en-US'),
    onChange: undefined,
};
