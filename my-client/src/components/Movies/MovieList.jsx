import { useState, useEffect } from "react";
import { Button, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
const MovieList = ({ movies, setedit, setloading }) => {
    const deleteMovie = async function fetchMovies(id) {
        setloading(true);
        let response = await fetch(
            `http://localhost:5000/api/v1/movie/edit?movie_id=${id}`,
            {
                method: "DELETE",
            }
        );
        if (response.status === 204) {
            console.log(response);

            // setIsModalVisible(false);
        } else alert(response);

        setloading(false);
    };
    // fetchMovies();

    const columns = [
        {
            title: "Name",
            dataIndex: "title",
            sorter: (a, b) => a.title.length - b.title.length,
        },
        {
            title: "Price",
            dataIndex: "price",
            defaultSortOrder: "descend",
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: "Rating",
            dataIndex: "rating",
            defaultSortOrder: "descend",
            sorter: (a, b) => a.rating - b.rating,
        },
        {
            title: "Genre",
            dataIndex: ["genre", "genre_name"],
            // defaultSortOrder: "descend",
            // sorter: (a, b) => a.genre.genre_name - b.genre.genre_name,
        },
        {
            title: "Actions",
            dataIndex: "movie_id",
            key: "actions",
            render: (movie_id, record) => {
                return (
                    <>
                        <span style={{ marginRight: "16px" }}>
                            <EditOutlined
                                onClick={(e) => {
                                    // e.preventDefault();
                                    console.log(movie_id, record);
                                    record = {
                                        ...record,
                                        genre_id: record.genre.genre_id,
                                        release_date: moment(
                                            record.release_date
                                        ),
                                    };
                                    setedit(record);
                                }}
                            />
                        </span>
                        <span style={{ marginRight: "16px" }}>
                            <DeleteOutlined
                                onClick={() => deleteMovie(movie_id)}
                            />
                        </span>
                    </>
                );
            },
            // defaultSortOrder: "descend",
            // sorter: (a, b) => a.genre.genre_name - b.genre.genre_name,
        },
    ];

    console.log(movies);
    return <Table columns={columns} dataSource={movies} />;
};

export default MovieList;
