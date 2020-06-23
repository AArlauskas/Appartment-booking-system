import React from "react";
import { Breadcrumbs, Link } from "@material-ui/core";
import { DateRange, LoyaltySharp, FolderOpen } from "@material-ui/icons";
import "./NavigationBreadcrumbs.scss";
import AvatarWithDropdown from "../Avatar/AvatarWithDropdown";

const NavigationBreadcrumbs = () => {
    const currentPage = window.location.pathname;
    return (
        <div className="Navigation-Breadcrumbs-Wrapper">
            <Breadcrumbs separator={<div className={"Separator"}>||</div>} className="Breadcrumbs">
                <Link
                    href="/"
                    className={currentPage === "/" ? "LinkBold" : "Link"}
                >
                    <DateRange className="Icon" fontSize="small" />
                    Scheduler
                </Link>
                <Link
                    href="/categories"
                    className={currentPage === "/categories" ? "LinkBold" : "Link"}
                >
                    <FolderOpen className="Icon" fontSize="small" />
                    Categories
                </Link>
                <Link
                    href="/tags"
                    className={currentPage === "/tags" ? "LinkBold" : "Link"}
                >
                    <LoyaltySharp className="Icon" fontSize="small" />
                    Tags
                </Link>
            </Breadcrumbs>
            <span style={{ alignSelf: "right" }}>
                <AvatarWithDropdown />
            </span>
        </div>
    );
};

export default NavigationBreadcrumbs;
