const mongoose = require("mongoose");
const Media = require("../models/media.model");

exports.uploadMedia = async (req, res) => {
    try {
      if(!req.files['media-file'] || !Array.isArray(req.files['media-file']) || req.files['media-file'].length == 0) {
        return res.status(200).json({ err: "Media file is required.", data: null });        
      }
      let { caption_text } = req.body;
      let media = await Media.findOne({ caption: caption_text });
      if(media) return res.status(200).json({ err: "Media with same caption already exists.", data: null });
      media = new Media({
        _id: new mongoose.Types.ObjectId(),
        caption: caption_text,
        file: req.files['media-file']
      });
      media = await media.save();
      return res.status(200).json({ err: null, data: media });
    } catch (e) {
      return res.status(200).json({ err: e.message, data: null });
    }
  };