import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';

import { Button } from 'antd'
import styled from 'styled-components';

const SearchBar = (props) => {
    const {
        StraffModalStore
    } = props,
    {

        getList,
        isFetching,
        addData,
        saveData,
        saveIsFetching
    } = StraffModalStore;

    const buttonList = [
        {
            name:'Add',
            type:'primary',
            loading:false,
            style:{ background:'blue' },
            onClick:()=>{
                addData();
            }
        },
        {
            name:'Save',
            type:'primary',
            loading:saveIsFetching,
            style:{ background:'green' },
            onClick:()=>{
                saveData();
            }
        },
        {
            name:'Update',
            type:'primary',
            loading:isFetching,
            style:{ background:'red' },
            onClick:()=>{
                getList();
            }
        }
    ]

    return(
        <ButtonList>
            {
                buttonList.map((item, index)=>{
                    return (
                        <Button 
                            key={index}
                            style={item.style}
                            type={item.type}
                            loading={item.loading}
                            onClick={item.onClick}
                        >
                            {item.name}
                        </Button>
                    )
                })
            }
        </ButtonList>
    )
};

export default (inject('StraffModalStore'))(observer(SearchBar))


const ButtonList = styled.div`
    display: flex;
    justify-content: space-between;
    align-self: center;
    padding-bottom: 50px;
    /* flex: 0 1 100%; */
    width: 100%;
`