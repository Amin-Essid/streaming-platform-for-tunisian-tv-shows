import React from 'react';

export default class Ads extends React.Component {
    
  componentDidMount () {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

render () {
    return (
        <div>
            <ins className="adsbygoogle"
                style={{ display: 'block'}}
                data-ad-format="fluid"
                data-ad-layout-key="-gc+3r+68-9q-29"
                data-ad-client="ca-pub-8119914449289013"
                data-ad-slot="9195234753">
            </ins>
        </div>
    );
  }
}