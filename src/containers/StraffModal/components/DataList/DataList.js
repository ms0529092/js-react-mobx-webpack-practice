import React, { useEffect, useRef, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { Table, DatePicker, Slider, Input } from 'antd';

import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import styled from 'styled-components';


const DataList = (props) => {
    const {
        StraffModalStore,
        ContentInsideRef
    } = props,
    {
        params,
        changeValue,
        isFetching,
        list
    } = StraffModalStore

    const columns = [
        {
            title: 'Name',
            dataIndex: 'Name',
            key: 'Name',
            textWrap: 'word-break',
            ellipsis:true,
            render:(text, record)=>{
                return (
                    <Input 
                        // defaultValue={text}
                        value={params[record.key].Name}
                        onChange={(e)=>{
                            changeValue(record.key, e.target.value, 'Name')
                        }}
                    />
                )
            }
        },
        {
            title: 'Birthday',
            dataIndex: 'DateOfBirth',
            key: 'DateOfBirth',
            textWrap: 'word-break',
            ellipsis:true,
            render:(text, record)=>{
                return(
                    <DatePicker 
                        // defaultValue={dayjs(text, 'YYYY-MM-DD')}
                        value={dayjs(params[record.key].DateOfBirth, 'YYYY-MM-DD')} 
                        onChange={(date)=>{
                            changeValue(record.key, date, 'DateOfBirth')
                        }}
                    />
                )
            }
        },
        {
            title: 'Salary',
            dataIndex: 'Salary',
            key: 'Salary',
            textWrap: 'word-break',
            ellipsis:true,
            render:(text, record)=>{
                return(
                    <Slider 
                        // defaultValue={text}
                        value={params[record.key].Salary} 
                        max={100000}
                        min={0}
                        onChange={(val)=>{
                            changeValue(record.key, val, 'Salary')
                        }}
                    />
                )
            }
        },
        {
            title: 'Address',
            dataIndex: 'Address',
            key: 'Address',
            textWrap: 'word-break',
            ellipsis:true,
            render:(text, record)=>{
                return (
                    <Input 
                        // defaultValue={text}
                        value={params[record.key].Address}
                        onChange={(e)=>{
                            changeValue(record.key, e.target.value, 'Address')
                        }}
                    />
                )
            }
        },

    ];

    const TableListRef = useRef();

    const [tableHeight, setTableHeight] = useState(0)

    const computedTableHeight = () => {
        const TableListHeight = TableListRef?.current?.offsetHeight;
        const headerHeight = 47
        const height = TableListHeight - headerHeight;

        setTableHeight(height)
        
    }

    useEffect(()=>{
        setTimeout(()=>{
            computedTableHeight();
        }, 0);

        window.addEventListener('resize', computedTableHeight)

        return ()=> {
            window.removeEventListener('resize', computedTableHeight)
        }
    })

    return(
        <TableList ref={TableListRef}>
            <TableListView 
                columns={columns}
                dataSource={list}
                pagination={false}
                loading={isFetching}
                size={'middle'}
                scroll={{
                    y:tableHeight
                }}
            />
        </TableList>
    )
};

export default (inject('StraffModalStore'))(observer(DataList))


const TableList = styled.div`
    height: calc(100% - 82px);
`

const TableListView = styled(Table)`
    /* height: 100%; */
`