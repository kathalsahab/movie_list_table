import React from "react";
import Menu from "antd/lib/menu";
import Dropdown from "antd/lib/dropdown";

export const GenreFilter = ({ genres, filterBy, ...props }) => {
    const onClick = ({ key }) => {
        filterBy(key);
    };

    const menu = (
        <Menu onClick={onClick}>
            {genres.map((e) => (
                <Menu.Item key={e.genre_id}>{e.genre_name}</Menu.Item>
            ))}
        </Menu>
    );

    return (
        <div {...props}>
            <Dropdown className="filter" overlay={menu}>
                <a className="ant-dropdown-link" href="#">
                    Filter By Genre
                </a>
            </Dropdown>
        </div>
    );
};
