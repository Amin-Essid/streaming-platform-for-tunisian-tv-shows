import React from 'react'

export default function NoInternet() {
    return (
        <>
            <div className='noInternet-msg'>
                <p>الرجاء التأكد من إتصالك بشبكة الانترنات و من ثم قم بتحديث الصفحة</p>
            </div>
            <a href='https://www.btounsi.com/' className="error-btn">
                عودة إلى الرئيسية
            </a>
        </>
    )
}
