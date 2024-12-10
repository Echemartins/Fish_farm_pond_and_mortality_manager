const PondModel = require("../models/pondModel");
const Mortality = require("../models/mortalityModel");
// const User = require('../models/usermodel');
// const multer = require('multer')

// Controller functions
const pondController = {
    // Create a new post
    createPond: async (req, res) => {
        try {
            const {
                pondName,
                stockQuantity,
                responsible,
                location,
                additionalInformation,
            } = req.body;
            if (!pondName || !stockQuantity || !responsible) {
                return res.json("some fields `are compulsory");
            }

            const existingPond = await PondModel.findOne({ pondName });
            if (existingPond) {
                return res.json("pond already created");
            }
            newPond = new PondModel({
                pondName,
                stockQuantity,
                responsible,
                location,
                additionalInformation,
            });
            await newPond.save();
            res.redirect("/");
            // res.status(200).json({message:"registration Succesful", data: newPond});
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Pond  creation failed" });
        }
    },

    getPondDetails: async (req, res) => {
        try {
            const { pondId } = req.params;
            const pond = await PondModel.findById(pondId).populate(
                "mortalities"
            );
            const mortalities = await Mortality.find({ pondId }).sort({
                date: -1,
            });
            res.render("viewpond", { pond, mortalities });
        } catch (error) {
            res.status(500).json({
                message: "error fetching pond details",
                error,
            });
        }
    },

    // Get all ponds
    getAllPonds: async (req, res) => {
        try {
            const searchedPonds = req.query.q;
            let queryObj = {}
            
            if (searchedPonds) {
                queryObj = {pondName: {$regex: searchedPonds, $options: "i" }}
            }
            
            // const allPonds = await PondModel.find({
            //   pondName: { $regex: searchedPonds, $options: "i" }
            // });
            const ponds = await PondModel.find(queryObj).populate("mortalities");
            // console.log(ponds)

            const allPonds = ponds.map((pond) => {
                const totalMortality = pond.mortalities.reduce(
                    (sum, mortality) => sum + mortality.quantity,
                    0
                );
                const currentFishCount = pond.stockQuantity - totalMortality;
                
                return {
                    ...pond.toObject(),
                    currentFishCount,
                };
            });

            res.render("index", { allPonds });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Server error" });
        }
    },

        searchPonds: async (req, res) => {
        try {
          const searchedPonds = req.query.q;
          if (!searchedPonds) {
            return res.render('index', {});
          }
          
          const allPonds = await PondModel.find({
            pondName: { $regex: searchedPonds, $options: "i" }
          });
      
          res.render('index', {allPonds});
        } catch (error) {
          res.render('index', { allPonds: [], error: "Error occurred" });
        }
      },

    // Get post by ID
    // getPostById: async (req, res) => {
    //     try {
    //         const postId = req.params.id;

    //         const post = await Post.findById(postId).populate('user', 'username');

    //         if (!post) {
    //             return res.status(404).json({ error: 'Post not found' });
    //         }

    //         return res.status(200).json(post);
    //     } catch (err) {
    //         console.error(err);
    //         return res.status(500).json({ error: 'Server error' });
    //     }
    // },

    // Delete post by ID
    deletePostById: async (req, res) => {
        try {
            const { pondId } = req.params;
            console.log(req.params)
            const deletedPond = await PondModel.findByIdAndDelete(pondId);

            if (!deletedPond) {
                return res.status(404).json({ error: 'Pond not found' });
            }

            res.redirect('/');
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Server error' });
        }
    }
};

module.exports = pondController;
