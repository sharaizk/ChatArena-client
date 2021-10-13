import React,{useState} from 'react'
import { Button } from "antd";
import {PlusOutlined} from '@ant-design/icons'
import server from '../../../../api/server';

const AcceptRequest = ({index,senderId,currentUserId})=>{
    const[isLoading,setLoading]=useState([])

    const onClick=async()=>{
      try {
        const newLoading = [...isLoading]
        newLoading[index] = true
        setLoading(newLoading)
        await server.patch('/api/user/acceptrequest',{sender:senderId,receiver:currentUserId})
        newLoading[index] = false;
        setLoading(newLoading)
      } catch (error) {
        console.log(error)
      }
    }
  
    return <Button loading={isLoading[index]} shape="circle" onClick={()=>onClick()} icon={<PlusOutlined />}/>
}

export default AcceptRequest