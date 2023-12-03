import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Button, Col, Container, Row } from 'react-bootstrap'
import Select from 'react-select';

const StatisticalComponent = () => {
    const [ListStatistical, setListStatistical] = useState([]);
    const [Statistical, setStatistical] = useState({})
    const [StatisticalID, setStatisticalID] = useState(null);
    const [searchValue, setSearchValue] = useState('Search by username');
    const [selectedStatus, setSelectedStatus] = useState([]);
    const [StatisticalBy, setStatisticalBy] = useState('bestSelling');


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:8080/api/orderAndDetail`);
                setListStatistical(response.data || {});
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, []);
    const onClickfilter = async () => {
        try {
            let startDate = document.getElementById("ngayBatDau").value;
            let endDate = document.getElementById("ngayKetThuc").value;
            if (startDate > endDate) {
                alert("Ngày bắt đầu không thể lớn hơn ngày kết thúc");
                return;
            }
            const response = await axios.post("http://localhost:8080/api/statistical/filter", {
                ngayBatDau: startDate,
                ngayKetThuc: endDate,
            });
            setListStatistical(response.data || []);
            console.log(response);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // data of status 
    const statusOptions = [
        { value: 'pending', label: 'Pending' },
        { value: 'processing', label: 'Processing' },
        { value: 'shipped', label: 'Shipped' },
        { value: 'delivered', label: 'Delivered' },
        { value: 'cancelled', label: 'Cancelled' },
    ];

    const onclickDetail = () => {
    }
    //search by username
    const onClickSearch = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/statistical/search', { username: searchValue });
            console.log('Response:', response.data);
            setListStatistical(response.data || {})
        } catch (error) {
            console.error('Error searching orders:', error);
        }
    };
    //search by status  
    const handleStatusChange = (selectedOptions) => {
        setSelectedStatus(selectedOptions);
        //search when have swap
        searchOrders(selectedOptions);
    };
    //search by status  
    const searchOrders = async (selectedOptions) => {
        try {
            const selectedValues = selectedOptions.map((option) => option.value);
            const response = await axios.post('http://localhost:8080/api/statistical/search/status', { status: selectedValues });
            setListStatistical(response.data || []);

        } catch (error) {
            console.error('Error searching orders:', error);
        }
    };
    //best seller and dow seller
    const orderOptions = [
        { value: 'bestSelling', label: 'best-selling food' },
        { value: 'worstSelling', label: 'food sells the slowest' },
    ];
    const handleOrderByChange = (selectedOption) => {
        setStatisticalBy(selectedOption.value);
        searchOrdersBy(selectedOption.value);
    };
    const searchOrdersBy = async (orderByValue) => {
        try {
            const response = await axios.post('http://localhost:8080/api/order/search/bySale', { orderBy: orderByValue });
            console.log('Response:', response.data);
            setListStatistical(response.data || []);
        } catch (error) {
            console.error('Error searching orders:', error);
        }
    };


    return (
        <>
            <div class="row" data-select2-id="12">
                <div class="col-md-10 offset-md-1">
                    <div class="row">
                        <div className="col-5">
                            <div className="form-group">
                                <label>Status:</label>
                                <Select
                                    isMulti
                                    options={statusOptions}
                                    value={selectedStatus}
                                    onChange={handleStatusChange}
                                />
                            </div>
                        </div>

                        <div class="col-4" >
                            <div class="input-group input-group-lg">
                                <input
                                    type="search"
                                    class="form-control form-control-lg"
                                    placeholder="Type your keywords here"
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                />
                                <div class="input-group-append">
                                    <button onClick={() => { onClickSearch() }} type="submit" class="btn btn-lg btn-default">
                                        <i class="fa fa-search"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-8 " >
                <div className='form-group' >
                    <label for="ngayBatDau">Ngày bắt đầu:</label>
                    <input type="date" id="ngayBatDau" name="ngayBatDau" required />

                    <label for="ngayKetThuc">Ngày kết thúc:</label>
                    <input type="date" id="ngayKetThuc" name="ngayKetThuc" required />

                    <Button type="submit" onClick={() => onClickfilter()}>filter</Button>
                </div>
            </div>
            <div class="card-body">
                <div id="example2_wrapper" class="dataTables_wrapper dt-bootstrap4"><div class="row"><div class="col-sm-12 col-md-6"></div><div class="col-sm-12 col-md-6"></div></div><div class="row"><div class="col-sm-12"><table id="example2" class="table table-bordered table-hover dataTable dtr-inline collapsed" aria-describedby="example2_info">
                    <thead>
                        <tr>
                            <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1" aria-label="Browser: activate to sort column ascending">STT</th>
                            <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1" aria-label="Rendering engine: activate to sort column ascending">ID</th>
                            <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1" aria-label="CSS grade: activate to sort column ascending">Username</th>
                            <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1" aria-label="Platform(s): activate to sort column ascending">Address</th>
                            <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1" aria-label="CSS grade: activate to sort column ascending">Price</th>
                            <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1" aria-label="CSS grade: activate to sort column ascending">Status</th>
                            <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1" aria-label="CSS grade: activate to sort column ascending">Date</th>
                            <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1" aria-label="CSS grade: activate to sort column ascending">Payment</th>
                            <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1" aria-label="CSS grade: activate to sort column ascending">Note</th>
                            <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1" aria-label="CSS grade: activate to sort column ascending">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ListStatistical.map((Statistical, index) => {
                            return (
                                <tr key={Statistical.id}>
                                    <th>{index + 1}</th>
                                    <th>{Statistical.id}</th>
                                    <th>{Statistical.user.username}</th>
                                    <th>{Statistical.address}</th>
                                    <th>{Statistical.price}</th>
                                    <th>{Statistical.status}</th>
                                    <th>{Statistical.date}</th>
                                    <th>{Statistical.payment}</th>
                                    <th>{Statistical.note}</th>
                                    <th>{Statistical.quantity}</th>
                                    <th className='col-md-2'>
                                        <button type="submit" className="btn btn-success" onClick={() => onclickDetail(Statistical.id)}>Detail</button>
                                    </th>
                                </tr>
                            )
                        })
                        }
                        <th>tổng doanh thu: {ListStatistical.reduce((total, Statistical) => total + Statistical.price, 0)} </th>
                    </tbody>
                </table></div></div><div class="row"><div class="col-sm-12 col-md-5"><div class="dataTables_info" id="example2_info" role="status" aria-live="polite">Showing 1 to 10 of 57 entries</div></div><div class="col-sm-12 col-md-7"><div class="dataTables_paginate paging_simple_numbers" id="example2_paginate"><ul class="pagination"><li class="paginate_button page-item previous disabled" id="example2_previous"><a href="#" aria-controls="example2" data-dt-idx="0" tabindex="0" class="page-link">Previous</a></li><li class="paginate_button page-item active"><a href="#" aria-controls="example2" data-dt-idx="1" tabindex="0" class="page-link">1</a></li><li class="paginate_button page-item "><a href="#" aria-controls="example2" data-dt-idx="2" tabindex="0" class="page-link">2</a></li><li class="paginate_button page-item "><a href="#" aria-controls="example2" data-dt-idx="3" tabindex="0" class="page-link">3</a></li><li class="paginate_button page-item "><a href="#" aria-controls="example2" data-dt-idx="4" tabindex="0" class="page-link">4</a></li><li class="paginate_button page-item "><a href="#" aria-controls="example2" data-dt-idx="5" tabindex="0" class="page-link">5</a></li><li class="paginate_button page-item "><a href="#" aria-controls="example2" data-dt-idx="6" tabindex="0" class="page-link">6</a></li><li class="paginate_button page-item next" id="example2_next"><a href="#" aria-controls="example2" data-dt-idx="7" tabindex="0" class="page-link">Next</a></li></ul></div></div></div></div>
            </div>
        </>
    )
}

export default StatisticalComponent