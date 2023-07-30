import React, { useEffect, useRef } from "react";
import { configure } from 'mobx'
import { Provider } from 'mobx-react';
import { Layout, ConfigProvider } from 'antd';
import styled, { createGlobalStyle } from "styled-components";


import locale from 'antd/locale/zh_CN';

import * as store from './store';
import StraffModal from './containers/StraffModal/StraffModal';

const { Content } = Layout;
configure({  enforceActions: 'never', })

const App = () => {
    const ContentInsideRef = useRef()

    return(
        <ConfigProvider locale={locale}>
            <Provider {...store}>
                <LayoutView className="layout">
                    <GlobalStyle />
                    <ContentView>
                        <ContentInside ref={ContentInsideRef} className={'site-layout-content'}>
                            <StraffModal ContentInsideRef={ContentInsideRef} />
                        </ContentInside>
                    </ContentView>
                </LayoutView>
            </Provider>
        </ConfigProvider>
    )
}

export default App

const GlobalStyle = createGlobalStyle`
    html,
    body,
    #root {
        height: 100%;
        margin:0 auto;
    }
`
const LayoutView = styled(Layout)`
    height:100%;
    /* overflow: scroll; */

    /* .ant-layout-content{
        overflow-y: scroll;
    } */
`

const ContentView = styled(Content)`
    padding:50px;
`

const ContentInside = styled.div`
    min-height: 100%;
    background: rgba(255, 255, 255, 1);
    display: flex;
    flex-flow: column;
    overflow-y: hidden;
    position: relative;
`