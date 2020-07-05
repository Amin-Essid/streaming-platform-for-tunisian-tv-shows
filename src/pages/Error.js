import React, { Component } from 'react';

export default class Error extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true
        }
    }
    
    render() {
        if (this.state.hasError) {
            return (
                <>
                    <div className='error-msg' style={{fontSize: '4rem'}}>
                        404
                    </div>
                    <div className='error-msg' style={{fontSize: '1.3rem'}}>
                        هذه الصفحة غير موجودة
                    </div>
                    <a href='http://localhost:3000/' className="error-btn">
                        عودة إلى الرئيسية
                    </a>
                </>
            )
        }
        return this.props.children
    }
}

