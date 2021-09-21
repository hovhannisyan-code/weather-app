import React, { useEffect } from 'react';
import { Table, Tag, Space, Layout, Menu, Breadcrumb, Select, Row, Col, Button, InputNumber, Divider, List } from 'antd';
import { connect } from 'react-redux';
import CitiesLoadThunk from '../store/actions/cities';
import GetWeatherThunk from '../store/actions/users';
import { Link } from 'react-router-dom';
import actionTypes from '../store/action-types';
import { Line } from '@ant-design/charts';
const Main = ({
    cities,
    citiesDataList,
    reportsLoading,
    measurement,
    recomendCities,
    setFavoriteTemp,
    setMeasurment,
    onCitiesLoad,
    favoriteCities,
    getWeather,
    weatherReports

}) => {

    useEffect(() => {
        onCitiesLoad();
    }, [onCitiesLoad]);
    const handleCityChange = (cities) => {
        getWeather(cities);
    }
    const handleDeleteCity = (city) => {
        if (citiesDataList.length === 1) {
            city = null;
        }
        getWeather(city);
    }
    const handleSetTemp = (temp) => {
        setFavoriteTemp(temp);
        getWeather('notToggle');
    }
    const handleSetMeasurment = (measure) => {
        setMeasurment(measure);
        getWeather('notToggle');
    }

    const { Header, Footer, Content } = Layout;
    const { Option } = Select;
    const citiesList = [];
    for (const key in cities) {
        if (Object.hasOwnProperty.call(cities, key)) {
            const city = cities[key];
            citiesList.push(<Option key={city.name}>{city.name}</Option>);
        }
    }
    const citiesDataListColumns = [
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: tags => (
                <>
                    <Tag color={tags ? `green` : 'volcano'}>
                        {<span>{tags ? `↑` : '↓'} </span>}
                    </Tag>
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        onClick={() => handleDeleteCity(record.city)}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];
    const config = {
        data: weatherReports,
        xField: 'year',
        yField: 'value',
        seriesField: 'category',
        meta: {
            value: {
                formatter: (v) => {
                    return `${v.toFixed(2)}`;
                },
            },
        },
        yAxis: {
            label: {
                formatter: function formatter(v) {
                    return ''.concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
                        return ''.concat(s, ',');
                    });
                },
            },
        },
    };

    return (
        <>
            <Layout>
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
                        <Menu.Item key="2"><a rel="noreferrer" href="https://openweathermap.org/forecast5" target="_blank">API</a></Menu.Item>
                        <Menu.Item key="3"><a rel="noreferrer" href="https://www.linkedin.com/in/gor-hovhannisyan-1aa89b14b/" target="_blank">Author</a></Menu.Item>
                    </Menu>
                </Header>
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>Weather</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>

                        <Row gutter={[16, 24]} style={{ marginBottom: 15 }}>
                            <Col className="gutter-column" span={2}>
                                <Select
                                    style={{ width: `100%` }}
                                    defaultValue={measurement}
                                    onChange={handleSetMeasurment}
                                >
                                    <Option value="kelvin">Kelvin</Option>
                                    <Option value="celsius">Celsius</Option>
                                    <Option value="fahrenheit">Fahrenheit</Option>
                                </Select>
                            </Col>
                            <Col className="gutter-column" span={3}>
                                <InputNumber
                                    style={{ width: `100%` }}
                                    placeholder="Favorite Temperature"
                                    type="number"
                                    onChange={handleSetTemp}
                                />
                            </Col>
                            <Col className="gutter-column" span={7}>
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="Favorite cities"
                                    value={favoriteCities}
                                    onChange={e => handleCityChange(e)}
                                >
                                    {citiesList}
                                </Select>
                            </Col>



                        </Row>
                        <Row gutter={[16, 24]}>
                            <Col className="gutter-column" span={12}>
                                {!!citiesDataList.length &&
                                    <Table
                                        loading={reportsLoading}
                                        columns={citiesDataListColumns}
                                        dataSource={citiesDataList}
                                        pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'] }}
                                    />
                                }
                            </Col>
                            <Col span={12}>
                                {!!citiesDataList.length &&
                                    <Line
                                        {...config}
                                        loading={reportsLoading}
                                    />
                                }

                            </Col>
                        </Row>
                        <Row gutter={[16, 24]}>
                            <Col className="gutter-column" span={12}>
                                {!!recomendCities.length &&
                                    <>
                                        <Divider orientation="left">Recomended to Travel</Divider>
                                        <List
                                            size="large"
                                            bordered
                                            dataSource={recomendCities}
                                            renderItem={item => <List.Item>{item}</List.Item>}
                                        />
                                    </>
                                }
                            </Col>
                        </Row>

                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©{new Date().getFullYear()} Created by Gor Hovhannisyan</Footer>
            </Layout>,

        </>
    );
}
const mapStateToProps = (state) => {
    return {
        cities: state.cities.list,
        favoriteCities: Array.from(state.user.favoriteCities),
        weatherReports: state.user.reports,
        reportsLoading: state.user.isLoading,
        citiesDataList: Array.from(state.user.citiesDataList),
        measurement: state.user.measurement,
        recomendCities: Array.from(state.user.recomendCities)
    }
};

const mapDispatchToProps = (dispatch) => ({
    onCitiesLoad: () =>
        dispatch(CitiesLoadThunk()),

    setFavoriteTemp: (temp) => {
        dispatch({ type: actionTypes.SET_TEMP, temp })
    },
    getWeather: (city) => {
        dispatch(GetWeatherThunk(city));
    },
    setMeasurment: (measurement) => {
        dispatch({ type: actionTypes.SET_MEASUREMENT, measurement })
    },

});

export default connect(mapStateToProps, mapDispatchToProps)(Main);