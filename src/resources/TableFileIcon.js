export default (filename) => {
    let sp = filename.split(".")
    let fileExt = sp[sp.length - 1]

    switch(fileExt){
        case "jpg":
        case "jpeg":
        case "svg":
        case "png":
        case "gif":
            return "image";
        
        case "mp4":
        case "mov":
        case "avi":
        case "wmv":
        case "flv":
            return "movie";

        case "docx":
        case "docm":
        case "doc":
        case "ppt":
        case "pptx":
        case "odf":
            return "description";
        
        case "mp3":
        case "wav":
        case "flac":
        case "ogg":
            return "music_note";

        case "txt":
            return "subject";

        case "psd":
        case "prproj":
        case "aep":
            return "brush";
        
        // lol
        case "php":
        case "cpp":
        case "c":
        case "h":
            return "sick";

        default:
            return "description";
    }
}