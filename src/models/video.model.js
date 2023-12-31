import mongoose, {Schema} from "mongoose"; 
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema({
    videoFile: {
        type: String,       // Cloudinary url 
        required: true
    }, 
    thumbnail: {
        type: String,       // Cloudinary url 
        required: true,
    },
    title: {
        type: String,         
        required: true,
    },
    description: {
        type: String,      
        required: true,
    },
    duration: {
        type: String,       // Cloudinary url 
        required: true,
    }, 
    views: {
        type: Number,       
        required: true,
    }, 
    isPublished: {
        type: Boolean, 
        default:true
    }, 
    owner:  {
        type: Schema.Types.ObjectId,
        ref:"User"
    }


},   
{timestamps: true}
)

videoSchema.plugin(aggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)