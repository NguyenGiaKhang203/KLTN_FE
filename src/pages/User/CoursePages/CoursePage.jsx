import React, { useEffect, useState, useMemo } from "react";
import Filter from "../../../components/FilterComponent/FilterComponet";
import CourseCardComponent from "../../../components/CourseCardComponent/CourseCardComponent";
import CourseDetailComponent from "../CourseDetailPage/CourseDetailPage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCourseDetails } from "../../../redux/slices/courseSlice";
import { addOrderProduct } from "../../../redux/slices/orderSlice";
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
import * as CourseService from "../../../services/CourseService";

// ✅ Mapping Type
const typeMapping = {
  "Cơ bản": "basic",
  "Trung cấp 1": "intermediate1",
  "Trung cấp 2": "intermediate2",
  "Nâng cao 1": "advanced1",
  "Nâng cao 2": "advanced2",
};

// ✅ Các lựa chọn sort
const sortOptions = [
  { id: "price-lowtohigh", label: "Giá: Thấp đến Cao" },
  { id: "price-hightolow", label: "Giá: Cao đến Thấp" },
  { id: "name-atoz", label: "Tên: A đến Z" },
  { id: "name-ztoa", label: "Tên: Z đến A" },
];

function CoursePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [allCourses, setAllCourses] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("price-lowtohigh");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [courseDetails, setCourseDetails] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(8); // Mặc định 8 khóa/trang

  useEffect(() => {
    const fetchCoursesFromDB = async () => {
      try {
        const res = await CourseService.getAllCourse();
        if (res?.status === "OK") {
          setAllCourses(res.data);
        }
      } catch (error) {
        console.error("Lỗi khi fetch khóa học:", error);
      }
    };
    fetchCoursesFromDB();
  }, []);

  // ✅ Update pageSize theo màn hình
  useEffect(() => {
    const updatePageSize = () => {
      const width = window.innerWidth;
      if (width <= 480) {
        setPageSize(2);
      } else if (width <= 768) {
        setPageSize(4);
      } else {
        setPageSize(8);
      }
    };
    updatePageSize();
    window.addEventListener('resize', updatePageSize);
    return () => window.removeEventListener('resize', updatePageSize);
  }, []);

  useEffect(() => {
    const applyFilterAndSort = () => {
      let filtered = [...allCourses];

      // ✅ Filter
      for (const key in filters) {
        if (filters[key].length > 0) {
          filtered = filtered.filter((course) => {
            const mappedValue =
              key === "type" ? typeMapping[course[key]] || course[key] : course[key];
            return filters[key].includes(mappedValue);
          });
        }
      }

      // ✅ Search
      if (searchText.trim() !== "") {
        const keyword = searchText.toLowerCase();
        filtered = filtered.filter((course) =>
          course.name?.toLowerCase().includes(keyword)
        );
      }

      // ✅ Sort
      switch (sort) {
        case "price-lowtohigh":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "price-hightolow":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "name-atoz":
          filtered.sort((a, b) =>
            (a.name || "").toLowerCase().localeCompare((b.name || "").toLowerCase())
          );
          break;
        case "name-ztoa":
          filtered.sort((a, b) =>
            (b.name || "").toLowerCase().localeCompare((a.name || "").toLowerCase())
          );
          break;
        default:
          break;
      }

      setCourseList(filtered);
      setCurrentPage(1);
    };
    applyFilterAndSort();
  }, [filters, sort, allCourses, searchText]);

  const paginatedCourses = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return courseList.slice(start, start + pageSize);
  }, [courseList, currentPage, pageSize]);

  const handleFilter = (sectionId, optionId) => {
    const updatedFilters = { ...filters };
    if (!updatedFilters[sectionId]) {
      updatedFilters[sectionId] = [optionId];
    } else {
      const index = updatedFilters[sectionId].indexOf(optionId);
      if (index === -1) {
        updatedFilters[sectionId].push(optionId);
      } else {
        updatedFilters[sectionId].splice(index, 1);
      }
    }
    setFilters(updatedFilters);
    sessionStorage.setItem("filters", JSON.stringify(updatedFilters));
  };

  const handleSort = (value) => {
    setSort(value);
  };

  const handleGetCourseDetails = (courseId) => {
    dispatch(fetchCourseDetails(courseId)).then((res) => {
      if (res?.payload) {
        setCourseDetails(res.payload);
        setOpenDetailsDialog(true);
      }
    });
  };

  const handleAddToCart = (courseId, classId) => {
    dispatch(addOrderProduct({ courseId, classId }));
    toast.success("Đã thêm khóa học vào giỏ hàng!");
  };

  return (
    <WrapperCoursePage>
      <Filter
        filters={filters}
        handleFilter={handleFilter}
        searchText={searchText}
        setSearchText={setSearchText}
      />

      <WrapperCourseContainer>
        <WrapperCourseHeader>
          <h2>Tất cả khóa học</h2>
          <div>
            <span>{courseList?.length} khóa học</span>
            <SortSelect value={sort} onChange={(e) => handleSort(e.target.value)}>
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </SortSelect>
          </div>
        </WrapperCourseHeader>

        <WrapperCourseGrid>
          {paginatedCourses.map((course) => (
            <CourseCardComponent
              key={course._id}
              course={{ ...course, id: course._id }}
              handleAddToCart={() => handleAddToCart(course._id, course.classId)}
              onClick={() => navigate(`/course-details/${course._id}`)}
            />
          ))}
        </WrapperCourseGrid>
      </WrapperCourseContainer>

      <CenteredPagination>
        <Pagination
          current={currentPage}
          total={courseList.length}
          pageSize={pageSize}
          onChange={(page) => setCurrentPage(page)}
        />
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
