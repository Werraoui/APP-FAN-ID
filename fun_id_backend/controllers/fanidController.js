const FanID = require('../models/fanid_model');
const Document = require('../models/document_model');
const asyncHandler = require('express-async-handler');
const QRCode = require('qrcode');

//@desc apply for fanid 
//@route POST api/fanid/apply
//@access public
const applyFanid = asyncHandler(async (req, res) => {
  try {
    const {
      userId,
      profile,
      personalInfo,
      documents
    } = req.body;

    // Validate required fields
    if (!profile || !personalInfo) {
      return res.status(400).json({ 
        message: 'Profile and personal information are required' 
      });
    }

    // Validate profile type
    const validProfiles = [
      'foreigner-classic-visa',
      'foreigner-visa-exempt',
      'foreigner-evisa',
      'moroccan-expired-cnie'
    ];
    if (!validProfiles.includes(profile)) {
      return res.status(400).json({ 
        message: 'Invalid profile type' 
      });
    }

    // Validate personal info
    const { firstName, lastName, nationality, dateOfBirth, passportNumber } = personalInfo;
    if (!firstName || !lastName || !nationality || !dateOfBirth || !passportNumber) {
      return res.status(400).json({ 
        message: 'All personal information fields are required' 
      });
    }

    // Validate documents based on profile
    const documentValidation = validateDocumentsForProfile(profile, documents);
    if (!documentValidation.valid) {
      return res.status(400).json({ 
        message: documentValidation.message 
      });
    }

    // Create Fan ID application
    const fanIdData = {
      userId: userId || null, // Can be null if user not logged in
      profile,
      firstName,
      lastName,
      nationality,
      dateOfBirth: new Date(dateOfBirth),
      passportNumber,
      status: 'pending'
    };

    // Add document references if provided
    if (documents) {
      fanIdData.documents = {};
      
      if (documents.passport) {
        fanIdData.documents.passport = documents.passport;
      }
      if (documents.classicVisa) {
        fanIdData.documents.classicVisa = documents.classicVisa;
      }
      if (documents.eVisa) {
        fanIdData.documents.eVisa = documents.eVisa;
      }
      if (documents.entryStampImage) {
        fanIdData.documents.entryStampImage = documents.entryStampImage;
      }
      if (documents.entryDate) {
        fanIdData.documents.entryDate = new Date(documents.entryDate);
      }
      if (documents.expiredCNIE) {
        fanIdData.documents.expiredCNIE = documents.expiredCNIE;
      }
      if (documents.passportOrReceipt) {
        fanIdData.documents.passportOrReceipt = documents.passportOrReceipt;
      }
    }

    const fanId = await FanID.create(fanIdData);

    res.status(201).json({
      message: 'Fan ID application submitted successfully',
      fanIdId: fanId._id,
      status: fanId.status
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Helper function to validate documents based on profile
const validateDocumentsForProfile = (profile, documents) => {
  if (!documents) {
    return { valid: false, message: 'Documents are required' };
  }

  switch (profile) {
    case 'foreigner-classic-visa':
      if (!documents.passport || !documents.classicVisa || !documents.entryStampImage || !documents.entryDate) {
        return { 
          valid: false, 
          message: 'Passport, classic visa, entry stamp image, and entry date are required' 
        };
      }
      break;

    case 'foreigner-visa-exempt':
      if (!documents.passport || !documents.entryStampImage || !documents.entryDate) {
        return { 
          valid: false, 
          message: 'Passport, entry stamp image, and entry date are required' 
        };
      }
      break;

    case 'foreigner-evisa':
      if (!documents.passport || !documents.eVisa || !documents.entryStampImage || !documents.entryDate) {
        return { 
          valid: false, 
          message: 'Passport, e-visa, entry stamp image, and entry date are required' 
        };
      }
      break;

    case 'moroccan-expired-cnie':
      if (!documents.expiredCNIE || !documents.passportOrReceipt) {
        return { 
          valid: false, 
          message: 'Expired CNIE and passport or receipt are required' 
        };
      }
      break;

    default:
      return { valid: false, message: 'Invalid profile type' };
  }

  return { valid: true };
};

//@desc validate a fan id 
//@route POST api/fanid/validate
//@access public
const validateFanid = asyncHandler(async (req, res) => {
  try {
    const { fanIdNumber, qrCode } = req.body;

    if (!fanIdNumber && !qrCode) {
      return res.status(400).json({ 
        message: 'Fan ID number or QR code is required' 
      });
    }

    let fanId;
    if (fanIdNumber) {
      fanId = await FanID.findOne({ fanIdNumber }).populate('userId', 'firstName lastName email');
    } else if (qrCode) {
      // Decode QR code to get Fan ID number
      // In a real implementation, you would decode the QR code
      fanId = await FanID.findOne({ qrCode }).populate('userId', 'firstName lastName email');
    }

    if (!fanId) {
      return res.status(404).json({ 
        message: 'Fan ID not found' 
      });
    }

    if (fanId.status !== 'approved') {
      return res.status(400).json({ 
        message: 'Fan ID is not approved',
        status: fanId.status
      });
    }

    // Check if Fan ID is still valid
    if (fanId.validUntil && new Date() > fanId.validUntil) {
      return res.status(400).json({ 
        message: 'Fan ID has expired',
        validUntil: fanId.validUntil
      });
    }

    res.json({
      valid: true,
      fanId: {
        fanIdNumber: fanId.fanIdNumber,
        firstName: fanId.firstName,
        lastName: fanId.lastName,
        nationality: fanId.nationality,
        issuedDate: fanId.issuedDate,
        validUntil: fanId.validUntil
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//@desc get the fan id 
//@route GET api/fanid/:id
//@access private
const getFanid = asyncHandler(async (req, res) => {
  try {
    const fanId = await FanID.findById(req.params.id)
      .populate('userId', 'firstName lastName email')
      .populate('documents.passport')
      .populate('documents.classicVisa')
      .populate('documents.eVisa')
      .populate('documents.entryStampImage')
      .populate('documents.expiredCNIE')
      .populate('documents.passportOrReceipt');

    if (!fanId) {
      return res.status(404).json({ message: 'Fan ID not found' });
    }

    res.json(fanId);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//@desc approve a fan id application
//@route PUT api/fanid/:id/approve
//@access private (admin only)
const approveFanid = asyncHandler(async (req, res) => {
  try {
    const fanId = await FanID.findById(req.params.id);

    if (!fanId) {
      return res.status(404).json({ message: 'Fan ID not found' });
    }

    if (fanId.status === 'approved') {
      return res.status(400).json({ message: 'Fan ID is already approved' });
    }

    // Update status first
    fanId.status = 'approved';
    fanId.validatedAt = new Date();
    fanId.validatedBy = req.userId;

    // Save to trigger pre-save hook which generates Fan ID number
    await fanId.save();

    // Generate QR code after Fan ID number is generated
    const qrData = JSON.stringify({
      fanId: fanId.fanIdNumber,
      name: `${fanId.firstName} ${fanId.lastName}`,
      nationality: fanId.nationality,
      issuedDate: fanId.issuedDate,
      validUntil: fanId.validUntil
    });

    fanId.qrCode = await QRCode.toDataURL(qrData);
    await fanId.save();

    res.json({
      message: 'Fan ID approved successfully',
      fanId: {
        fanIdNumber: fanId.fanIdNumber,
        qrCode: fanId.qrCode,
        issuedDate: fanId.issuedDate,
        validUntil: fanId.validUntil
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//@desc get all fan ids for a user
//@route GET api/fanid/user/:userId
//@access private
const getUserFanIds = asyncHandler(async (req, res) => {
  try {
    const fanIds = await FanID.find({ userId: req.params.userId })
      .select('-qrCode') // Don't send QR code in list
      .sort({ createdAt: -1 });

    res.json(fanIds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  applyFanid,
  validateFanid,
  getFanid,
  approveFanid,
  getUserFanIds
};
