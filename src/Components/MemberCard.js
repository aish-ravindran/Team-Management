import React, { useEffect, useState } from 'react'
import './MemberCard.css'
export default function MemberCard(jsonData) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (jsonData) {
      setData(jsonData.data)
    }
  }, [jsonData])
  return (

    <div className="card card-hover rounded-4 border-white flex-row p-3 m-2">
      <div className='rectangle'>
        <img src={data.img} className="circleImg" alt="Thumbnail" />
      </div>
      <div className='card-details'>
        <p className="card-hdr card-title-truncate">{data.first_name} {data.last_name}</p>
        <p className="card-txt card-title-truncate">{data.email}</p>
      </div>
    </div>
  )
}
