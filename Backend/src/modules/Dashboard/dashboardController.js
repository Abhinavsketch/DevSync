const express = require("express");
const teamModel = require("../Team/teamModel.js");
const projectModel = require("../Projects/projectModel.js");
const taskModel = require("../Tasks/taskModel.js");
const activityModel = require("../ActivityLog/activityLogModel.js");

const totalteamController = async (req, res) => {
  try {
    const totalCount = req.organization.teams.length;

    res.status(200).json({
      message: "Total Team Found",
      totalCount,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const totalProjectController = async (req, res) => {
  try {
    const organization = await req.organization.populate("teams");

    let totalProjects = 0;

    organization.teams.forEach((team) => {
      totalProjects += team.projects.length;
    });

    res.status(200).json({
      message: "Total Project Found",
      totalProjects,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const totaltaskController = async (req, res) => {
  try {
    const orgId = req.organization._id;

    const teams = await teamModel.find({
      organization: orgId,
    });

    if (teams.length === 0) {
      return res.status(200).json({
        message: "Team is not found",
        teams: [],
      });
    }

    const teamIds = teams.map((team) => {
      return team._id;
    });

    const projects = await projectModel.find({
      team: {
        $in: teamIds,
      },
    });

    if (projects.length === 0) {
      return res.status(200).json({
        message: "Project Not Found",
        project: [],
      });
    }

    const projectIds = projects.map((project) => project._id);

    const task = await taskModel.countDocuments({
      project: {
        $in: projectIds,
      },
    });

    res.status(200).json({
      message: "Total Tasks Found",
      tasks: task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const totaltodoController = async (req, res) => {
  try {
    const orgId = req.organization._id;

    const team = await teamModel.find({
      organization: orgId,
    });
    if (team.length === 0) {
      return res.status(200).json({
        message: "Team not found",
        team: [],
      });
    }

    const teamIds = team.map((team) => team._id);

    const projects = await projectModel.find({
      team: {
        $in: teamIds,
      },
    });

    if (projects.length === 0) {
      return res.status(200).json({
        message: "Project not found",
        project: [],
      });
    }

    const projectIds = projects.map((project) => project._id);

    const task = await taskModel.countDocuments({
      project: {
        $in: projectIds,
      },
      status: "to-do",
    });

    res.status(200).json({
      message: "Total To Do Task Found",
      ToDo: task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const totalprogressController = async (req, res) => {
  try {
    const orgId = req.organization._id;

    const teams = await teamModel.find({ organization: orgId });
    if (teams.length === 0) {
      return res.status(200).json({
        message: "Team not found",
        team: [],
      });
    }

    const teamIds = teams.map((team) => team._id);

    const projects = await projectModel.find({
      team: {
        $in: teamIds,
      },
    });
    if (projects.length === 0) {
      return res.status(200).json({
        message: "Project Not Found",
        projects: [],
      });
    }

    const projectIds = projects.map((project) => project._id);

    const task = await taskModel.countDocuments({
      project: {
        $in: projectIds,
      },
      status: "in-progress",
    });

    res.status(200).json({
      message: "Total In-Progress Task Found",
      totalInProgress: task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const totalreviewController = async (req, res) => {
  try {
    const orgId = req.organization._id;

    const teams = await teamModel.find({ organization: orgId });
    if (teams.length === 0) {
      return res.status(200).json({
        message: "Team not found",
        team: [],
      });
    }

    const teamIds = teams.map((team) => team._id);

    const projects = await projectModel.find({
      team: {
        $in: teamIds,
      },
    });
    if (projects.length === 0) {
      return res.status(200).json({
        message: "Project Not Found",
        projects: [],
      });
    }

    const projectIds = projects.map((project) => project._id);

    const task = await taskModel.countDocuments({
      project: {
        $in: projectIds,
      },
      status: "review",
    });

    res.status(200).json({
      message: "Total review Task Found",
      totalInProgress: task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const totaldoneController = async (req, res) => {
  try {
    const orgId = req.organization._id;

    const teams = await teamModel.find({ organization: orgId });
    if (teams.length === 0) {
      return res.status(200).json({
        message: "Team not found",
        team: [],
      });
    }

    const teamIds = teams.map((team) => team._id);

    const projects = await projectModel.find({
      team: {
        $in: teamIds,
      },
    });
    if (projects.length === 0) {
      return res.status(200).json({
        message: "Project Not Found",
        projects: [],
      });
    }

    const projectIds = projects.map((project) => project._id);

    const task = await taskModel.countDocuments({
      project: {
        $in: projectIds,
      },
      status: "done",
    });

    res.status(200).json({
      message: "Total Done Task Found",
      totalInProgress: task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const organizationInfoController = async (req, res) => {
  try {
    res.status(200).json({
      message: "Organization Found",
      org: req.organization,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const previewactivityController = async (req, res) => {
  try {
    const orgId = req.organization._id;

    const activity = await activityModel
      .find({ organization: orgId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("actor")
      .populate("project");
    if (activity.length === 0) {
      return res.status(200).json({
        message: "Activities Not Available",
        activity: [],
      });
    }

    res.status(200).json({
      message: "Activity Found",
      activity: activity,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const previewteamController = async (req,res)=>{
    try{
        const orgId = req.organization._id

        const team = await teamModel.find({organization:orgId}).limit(2)
        if(team.length === 0){
            return res.status(200).json({
                message:"Team Not Found",
                team:[]
            })
        }

        res.status(200).json({
            message:"Team Found",
            team:team
        })
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const previewprojectController = async (req,res)=>{
    try{
        const orgId = req.organization._id

        const team = await teamModel.find({organization:orgId})
        if(team.length === 0){
            return res.status(200).json({
                message:"Team not found"
            })
        }

        const teamIds = team.map(team => team._id)

        const projects = await projectModel.find({
            team:{
                $in:teamIds
            }
        }).limit(2)

        if(projects.length === 0){
            return res.status(200).json({
                message:"Projects not found",
                projects:[]
            })
        }

        res.status(200).json({
            message:"Projects Found",
            projects: projects
        })
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const overviewController = async (req,res)=>{
  try{
    const organization = req.organization
    const organizationId = organization._id
    await organization.populate("owner","name email")

    


    const teams = await teamModel.find({organization:organizationId}).select("_id name members projects createdAt").sort({createdAt:-1}).lean()

    const teamPreview = teams.slice(0,2)

    const totalTeams = teams.length


    const teamIds = teams.map((team)=>{
      return team._id
    })

    const projects = await projectModel.find({
      team:{
        $in:teamIds
      }
    }).select("_id title description status deadline team createdAt").sort({createdAt:-1}).lean()

    const projectPreview = projects.slice(0,2)

    const totalProjects = projects.length

    const projectIds = projects.map((project)=>{
      return project._id
    })

    const taskStats = await taskModel.aggregate([{$match:{project:{
      $in:projectIds
    }}},{
      $group:{
        _id:"$status",
        count: {$sum:1}
      }
    }])

    const taskCounts = {
      total:0,
      todo:0,
      inProgress:0,
      review:0,
      done:0
    }

    const statusKeyMap = {
      "to-do": "todo",
      "in-progress": "inProgress",
      "review": "review",
      "done": "done"
    }

    taskStats.forEach((item)=>{
      taskCounts.total += item.count
      const key = statusKeyMap[item._id]
      if(!key){
        return
      }

      
      taskCounts[key] = item.count

    })

    const activityPreview = await activityModel.find({organization:organizationId}).select("actor project entityType action message createdAt").populate("actor" ,"name email").populate("project" ,"title").sort({createdAt:-1}).limit(5).lean()

    const organizationSummary = {
      id:organizationId,
      name:organization.name,
      description:organization.description,
      owner:organization.owner,
      memberCount:organization.members.length,
      createdAt : organization.createdAt
    }

    res.status(200).json({
      message:"Organization Details",
      organization:organizationSummary,
      stats:{
        totalTeams : totalTeams,
        totalProjects:totalProjects,
        taskStats:taskCounts
      },
      previews:{
        teams:teamPreview,
        projects:projectPreview,
        activities:activityPreview
      }
    })

    
  }
  catch(error){
    res.status(500).json({
      message:error.message
    })
  }
}

module.exports = {
  totalteamController,
  totalProjectController,
  totaltaskController,
  totaltodoController,
  totalprogressController,
  totalreviewController,
  totaldoneController,
  organizationInfoController,
  previewactivityController,
  previewteamController,
  previewprojectController,
  overviewController
};
