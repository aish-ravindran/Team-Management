import React, { useEffect, useState } from 'react'
import MemberCard from '../Components/MemberCard'
import './TeamMember.css';
export default function TeamMembers() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        fetch('/memberData.json') // Assuming data.json is in the public folder
            .then(response => response.json())
            .then(data => {
                setData(data)
                setFilteredData(data); // Initially set filtered data to all data
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // Handle search input change
    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);
        const filtered = data.filter(item =>
            Object.values(item).some(field =>
                typeof field === 'string' && field.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        setFilteredData(filtered);
    };

    return (
        <div className='page-clr'>
            <div className='row header-clr p-3'>
                <div className='col-8'><h2 class>Team</h2></div>
                <div className='col-4'>
                    <input
                        type="text"
                        className="form-control rounded-6"
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

            </div>
            <div className='card-hdr p-5'>
            <h3 className='container-title'>Administrators</h3>
            <div class="row">
                {filteredData && filteredData.filter(user => user.role === 'admin').map((adminData) => <div class="col-3">
                    <MemberCard data={adminData} />
                </div>
                )}
            </div>
            <hr></hr>
            <h3 className='container-title'>Members</h3>
            <div class="row">
                {filteredData && filteredData.filter(user => user.role === 'member').map((memberData) => <div class="col-3">
                    <MemberCard data={memberData} />
                </div>
                )}
            </div>
            </div>
           
        </div>


    )
}
