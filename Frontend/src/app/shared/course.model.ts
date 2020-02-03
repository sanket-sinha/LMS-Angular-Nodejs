import { Lesson } from "./lesson.model";

export class Course {
    _id: String;
    coursename: String;
    coursecode: String;
    courseprice: String;
    discountedprice: String;
    courseduration: String;
    teachername: String;
    coursepicture: String;
    coursedescription: String;
    coursecategory: String;
    lesson: {
        [key: number]: Lesson;
    };
};