require('dotenv').config()
const mongoose = require("mongoose");
const uri = process.env.MONGO_URI;
// mongoose.connect(uri)
// const connection = mongoose.connection;
// connection.once("open", () => {
//     console.log("Connected to MongoDB...");
// })
mongoose.connect(uri)
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.error("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
})
const Course = mongoose.model("Course", courseSchema);

// Classes, objects
//Human, VuNguyen
//Course, nodeCourse
async function createCourse() {
    const course = new Course({
        name: "Test Course",
        author: "Vu Nguyen",
        tags: ["php", "backend"],
        isPublished: true
    })

    const result = await course.save();
    console.log({ result })
}

// createCourse();

async function getCourse() {
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than equal)
    // lt (less than)
    // lte (less than equal)
    // in
    // nin (not in)
    return await Course
        // .find({ author: "Vu Nguyen", isPublished: true })
        // .find({ price: { $gte: 10, $lte: 20 }})
        .find({ price: { $in: [10, 15, 20] }})
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 })
}

// async function getCourse() {
//     // or
//     // and
//     const course = await Course
//         // .find({ author: "Vu Nguyen", isPublished: true })
//         // .find({ price: { $gte: 10, $lte: 20 }})
//         .find()
//         // .or([ {author: "Vu Nguyen"}, {isPublished: true} ])
//         .and([{ author: "Vu Nguyen", isPublished: true }])
//         .limit(10)
//         .sort({ name: 1 })
//         .select({ name: 1, tags: 1 })
//     console.log(course);
// }

//Regular expression
// async function getCourse() {
//     const course = await Course
//         // .find({ author: "Vu Nguyen", isPublished: true })
//         // .find({ price: { $gte: 10, $lte: 20 }})

//         // Starts with Vu
//         .find({ author: /^Vu/})

//         // Ends with Nguyen
//         .find({ author: /Nguyen$/i })

//         // Contains Vu
//         .find({ author: /.*Vu.*/i})
//         .limit(10)
//         .sort({ name: 1 })
//         .select({ name: 1, tags: 1 })
//         // .count()
//     console.log(course);
// }

// async function getCourse() {
//     const pageNumber = 2;
//     const pageSize = 10;

//     const course = await Course
//         .find({ author: "Vu Nguyen", isPublished: true })
//         .skip((pageNumber - 1) * pageSize)
//         .limit(pageSize)
//         .sort({ name: 1 })
//         .select({ name: 1, tags: 1 })
//     console.log(course);
// }

// async function updateCourse(id) {
//     // Approach: Query first
//     const course = await Course.findById(id);
//     if(!course) return;

//     if(course.isPublished) return;

//     course.isPublished = false;
//     course.author = "VNVNVNV vvv"
//     const result = await course.save();
//     console.log({result})
// }

// async function updateCourse(id) {
//     // Approach: Query first
//     const course = await Course.update({_id: id}, {
//         $set: {
//             author: "TR",
//             isPublished: false
//         }
//     });
//     if(course.isPublished) return;
//     // console.log({result})
// }

// async function updateCourse(id) {
//     // Approach: Query first
//     const course = await Course.findByIdAndUpdate(id, {
//         $set: {
//             author: "Jason",
//             isPublished: false
//         }
//     }, { new: true });
//     console.log({course})
// }

async function removeCourse(id) {
    // Approach: Query first
    const course = await Course.findByIdAndRemove(id);
    console.log({course})
}


async function run() {
    const courses = await getCourse();
    console.log({courses})
}
// run()
removeCourse("628128f43b6520a2f614bdb7")