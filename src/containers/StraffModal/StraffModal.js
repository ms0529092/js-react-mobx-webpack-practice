import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';

import SearchBar from './components/SearchBar';
import DataList from './components/DataList';
import styled from 'styled-components';

const StraffModal = (props) => {

    const {
        StraffModalStore,
        ContentInsideRef,
    } = props,
    {
        getList
    } = StraffModalStore;

    useEffect(()=>{
        getList();
    })

    return (
        <StraffModalView>
            <SearchBar/>
            <DataList ContentInsideRef={ContentInsideRef}/>
        </StraffModalView>
    )
}

export default (inject('StraffModalStore'))(observer(StraffModal))


const StraffModalView = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 24px;
`