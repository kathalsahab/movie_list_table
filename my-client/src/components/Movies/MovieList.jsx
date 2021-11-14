import { useState, useEffect } from "react";
import { Table } from "antd";

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
];

const MovieList = ({ movies }) => {
    console.log(movies);
    return <Table columns={columns} dataSource={movies} />;
};

export default MovieList;
