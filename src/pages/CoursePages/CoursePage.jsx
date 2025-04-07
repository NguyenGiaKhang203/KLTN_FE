import React, { useEffect, useState } from "react";
import Filter from "../../components/FilterComponent/FilterComponet";
import CourseCardComponent from "../../components/CourseCardComponent/CourseCardComponent";
import CourseDetailComponent from "../CourseDetailPage/CourseDetailPage";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchCourseDetails } from "../../redux/slices/productSlice";
import { toast } from "react-toastify";
import {
  WrapperCoursePage,
  WrapperCourseContainer,
  WrapperCourseHeader,
  WrapperCourseGrid,
  SortSelect,
  CenteredPagination,
} from "./style";
import { Pagination } from "antd";
import * as CourseService from "../../services/CourseService";
import { useNavigate } from "react-router-dom";

const sortOptions = [
  { id: "price-lowtohigh", label: "Giá: Thấp đến Cao" },
  { id: "price-hightolow", label: "Giá: Cao đến Thấp" },
  { id: "title-atoz", label: "Tiêu đề: A đến Z" },
  { id: "title-ztoa", label: "Tiêu đề: Z đến A" },
];

function createSearchParamsHelper(filterParams) {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  return queryParams.join("&");
}

function CoursePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [courseList, setCourseList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [courseDetails, setCourseDetails] = useState(null);

  const categorySearchParam = searchParams.get("category");

  function handleSort(value) {
    setSort(value);
  }

  function handleFilter(sectionId, optionId) {
    let updatedFilters = { ...filters };
    if (!updatedFilters[sectionId]) {
      updatedFilters[sectionId] = [optionId];
    } else {
      const optionIndex = updatedFilters[sectionId].indexOf(optionId);
      if (optionIndex === -1) {
        updatedFilters[sectionId].push(optionId);
      } else {
        updatedFilters[sectionId].splice(optionIndex, 1);
      }
    }
    setFilters(updatedFilters);
    sessionStorage.setItem("filters", JSON.stringify(updatedFilters));
  }

  function handleGetCourseDetails(courseId) {
    dispatch(fetchCourseDetails(courseId)).then((res) => {
      if (res?.payload) {
        setCourseDetails(res.payload);
        setOpenDetailsDialog(true);
      }
    });
  }

  function handleAddToCart(courseId, totalStock) {
    const currentCartItems = cartItems.items || [];
    const itemIndex = currentCartItems.findIndex(
      (item) => item.productId === courseId
    );

    if (
      itemIndex > -1 &&
      currentCartItems[itemIndex].quantity + 1 > totalStock
    ) {
      toast.warning(
        `Chỉ có thể thêm ${currentCartItems[itemIndex].quantity} số lượng cho khóa học này`
      );
      return;
    }

    dispatch(
     
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("Khóa học đã được thêm vào giỏ hàng");
      }
    });
  }

  useEffect(() => {
    try {
      const storedFilters = JSON.parse(sessionStorage.getItem("filters"));
      setFilters(storedFilters || {});
    } catch (err) {
      setFilters({});
    }
    setSort("price-lowtohigh");
  }, [categorySearchParam]);

  // useEffect(() => {
  //   if (filters && Object.keys(filters).length > 0) {
  //     const queryString = createSearchParamsHelper(filters);
  //     setSearchParams(new URLSearchParams(queryString));
  //   }
  // }, [filters]);

  useEffect(() => {
    const fetchCoursesFromDB = async () => {
      try {
        const res = await CourseService.getAllCourse(filters, sort);
        if (res?.status === "OK") {
          setCourseList(res.data);
          console.log("response:", res.data);
        }
      } catch (error) {
        console.error("Lỗi khi fetch khóa học:", error);
      }
    };

    if (filters && sort) {
      fetchCoursesFromDB();
    }
  }, [filters, sort]);

  console.log("courseList", courseList);

  return (
    <WrapperCoursePage>
      <Filter filters={filters} handleFilter={handleFilter} />

      <WrapperCourseContainer>
        <WrapperCourseHeader>
          <h2>Tất cả khóa học</h2>
          <div>
            <span>{courseList?.length} khóa học</span>
            <SortSelect
              value={sort}
              onChange={(e) => handleSort(e.target.value)}
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </SortSelect>
          </div>
        </WrapperCourseHeader>

        <WrapperCourseGrid>
          {courseList.map((course) => (
            <CourseCardComponent
              key={course._id}
              course={{ ...course, id: course._id }} // Chuyển _id → id cho chuẩn
              handleAddToCart={handleAddToCart}
              onClick={() => navigate(`/course-details/${course._id}`)}
            />
          ))}

        </WrapperCourseGrid>
      </WrapperCourseContainer>

      <CenteredPagination>
        <Pagination defaultCurrent={1} total={courseList.length} />
      </CenteredPagination>

      {openDetailsDialog && courseDetails && (
        <CourseDetailComponent
          open={openDetailsDialog}
          setOpen={setOpenDetailsDialog}
          course={courseDetails}
        />
      )}
    </WrapperCoursePage>
  );
}

export default CoursePage;