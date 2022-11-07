import { Button } from 'antd';
import React from 'react';

function ButtonCustom(props) {
    const { loading, handleOnClick, title, className, icon } = props
    return (
        <Button className={`bg-[#6A983C] border border-[2px] text-center text-white border-[#46760A]  rounded rounded-[12px]  ${className}`} icon={icon} loading={loading} onClick={handleOnClick} >
            {title}
        </Button>
    );
}

export default ButtonCustom;