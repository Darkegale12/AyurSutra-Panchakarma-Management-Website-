import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Leaf,
  User,
  ArrowLeft,
  Upload,
  FileText,
  Eye,
  X,
  Download,
} from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "./ThemeProvider";
import newLogoImage from "figma:asset/55a14cbbf289c9fde8c4c8ca4230c7f789072dbd.png";

interface MedicalReportsPageProps {
  user: {
    id: string;
    name: string;
    email: string;
    userType: "patient" | "doctor";
  };
  onNavigate: (page: "patient-dashboard") => void;
  onLogout: () => void;
}

interface MedicalRecord {
  id: number;
  name: string;
  date: string;
  type: "prescription" | "report";
  file?: File;
}

export function MedicalReportsPage({
  user,
  onNavigate,
  onLogout,
}: MedicalReportsPageProps) {
  const { theme } = useTheme();
  const [showUploadDialog, setShowUploadDialog] =
    useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [uploadType, setUploadType] = useState<
    "prescription" | "report"
  >("prescription");
  const [viewType, setViewType] = useState<
    "prescription" | "report"
  >("prescription");
  const [uploadData, setUploadData] = useState({
    name: "",
    date: "",
    file: null as File | null,
  });
  const [medicalRecords, setMedicalRecords] = useState<
    MedicalRecord[]
  >([
    {
      id: 1,
      name: "Dr. Sharma",
      date: "2024-12-15",
      type: "prescription",
    },
    {
      id: 2,
      name: "Dr. Kumar",
      date: "2024-12-10",
      type: "prescription",
    },
    {
      id: 3,
      name: "Lab Corp",
      date: "2024-12-08",
      type: "report",
    },
    {
      id: 4,
      name: "City Hospital",
      date: "2024-12-05",
      type: "report",
    },
  ]);

  const handleUpload = (type: "prescription" | "report") => {
    setUploadType(type);
    setShowUploadDialog(true);
    setUploadData({ name: "", date: "", file: null });
  };

  const handleView = (type: "prescription" | "report") => {
    setViewType(type);
    setShowViewDialog(true);
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadData((prev) => ({ ...prev, file }));
    }
  };

  const handleSubmitUpload = () => {
    if (uploadData.name && uploadData.date && uploadData.file) {
      const newRecord: MedicalRecord = {
        id: medicalRecords.length + 1,
        name: uploadData.name,
        date: uploadData.date,
        type: uploadType,
        file: uploadData.file,
      };
      setMedicalRecords((prev) => [...prev, newRecord]);
      setShowUploadDialog(false);
      setUploadData({ name: "", date: "", file: null });
    }
  };

  const filteredRecords = medicalRecords.filter(
    (record) => record.type === viewType,
  );

  const handleViewFile = (record: MedicalRecord) => {
    if (record.file) {
      const url = URL.createObjectURL(record.file);
      window.open(url, '_blank');
    }
  };

  const handleDownloadFile = (record: MedicalRecord) => {
    if (record.file) {
      const url = URL.createObjectURL(record.file);
      const a = document.createElement('a');
      a.href = url;
      a.download = record.file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          theme === "dark"
            ? "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #0e1a2e 100%)"
            : "linear-gradient(135deg, #ffffff 0%, #f0fdf4 25%, #ffffff 50%, #f7fdf9 75%, #ffffff 100%)",
      }}
    >
      {/* Header */}
      <div className="border-b border-opacity-20 bg-white/10 dark:bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                onClick={() => onNavigate("patient-dashboard")}
                className="text-gray-600 dark:text-gray-400 hover:text-green-500"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </Button>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <User className="w-7 h-7 text-white" />
              </div>
              <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
                Profile
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white/90 p-1 shadow-lg ring-2 ring-green-400/50">
                <img
                  src={newLogoImage}
                  alt="AyurSutra Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent">
                AyurSutra
              </span>
            </div>

            <Button
              onClick={onLogout}
              variant="outline"
              className="border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            MEDICAL REPORTS
          </h1>
        </motion.div>

        {/* Medical Reports Grid */}
        <div className="grid grid-cols-2 gap-8 mb-16">
          {/* Upload Prescription */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 h-48 cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => handleUpload("prescription")}
            >
              <CardContent className="p-8 flex flex-col items-center justify-center h-full text-center">
                <Upload className="w-12 h-12 text-blue-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Upload Prescription
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  (IMG/PDF)
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* View Prescriptions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 h-48 cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => handleView("prescription")}
            >
              <CardContent className="p-8 flex flex-col items-center justify-center h-full text-center">
                <Eye className="w-12 h-12 text-green-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  View Prescriptions
                </h3>
              </CardContent>
            </Card>
          </motion.div>

          {/* Upload Lab Reports */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 h-48 cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => handleUpload("report")}
            >
              <CardContent className="p-8 flex flex-col items-center justify-center h-full text-center">
                <Upload className="w-12 h-12 text-purple-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Upload Lab Reports
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  (IMG/PDF)
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* View Lab Reports */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 h-48 cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => handleView("report")}
            >
              <CardContent className="p-8 flex flex-col items-center justify-center h-full text-center">
                <Eye className="w-12 h-12 text-orange-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  View Lab Reports
                </h3>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Footer Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="py-16 mt-12 border-t border-gray-200/50 dark:border-gray-700/50"
        >
          <footer className="bg-amber-200/40 dark:bg-black/40 py-12 px-4 border-t border-amber-400/30 dark:border-green-500/20">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <Leaf className="w-6 h-6 text-green-400" />
                    <span className="text-xl font-bold text-green-400">
                      AyurSutra
                    </span>
                  </div>
                  <p className="text-gray-400 dark:text-gray-400 text-gray-700">
                    Authentic Panchakarma management for modern
                    wellness.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-4">
                    Quick Links
                  </h3>
                  <ul className="space-y-2 text-gray-400 dark:text-gray-400 text-gray-700">
                    <li>About Us</li>
                    <li>Services</li>
                    <li>Practitioners</li>
                    <li>Contact</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-4">
                    Contact Info
                  </h3>
                  <ul className="space-y-2 text-gray-400 dark:text-gray-400 text-gray-700">
                    <li>Email: infoayursutra1111@gmail.com</li>
                    <li>Phone: +91 8830159065</li>
                    <li>Address: Pune, Maharashtra</li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-green-500/20 dark:border-green-500/20 border-green-200 mt-8 pt-8 text-center text-gray-400 dark:text-gray-400 text-gray-700">
                <p>
                  &copy; 2025 AyurSutra. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </motion.div>
      </div>

      {/* Upload Dialog */}
      <Dialog
        open={showUploadDialog}
        onOpenChange={setShowUploadDialog}
      >
        <DialogContent className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50">
          <DialogHeader>
            <DialogTitle className="text-gray-800 dark:text-gray-200">
              Upload{" "}
              {uploadType === "prescription"
                ? "Prescription"
                : "Lab Report"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label
                htmlFor="prescriber"
                className="text-gray-700 dark:text-gray-300"
              >
                {uploadType === "prescription"
                  ? "Name of Prescriber"
                  : "Lab/Hospital Name"}
              </Label>
              <Input
                id="prescriber"
                value={uploadData.name}
                onChange={(e) =>
                  setUploadData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                className="bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600"
                placeholder={
                  uploadType === "prescription"
                    ? "Dr. Name"
                    : "Lab Name"
                }
              />
            </div>

            <div>
              <Label
                htmlFor="date"
                className="text-gray-700 dark:text-gray-300"
              >
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={uploadData.date}
                onChange={(e) =>
                  setUploadData((prev) => ({
                    ...prev,
                    date: e.target.value,
                  }))
                }
                className="bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600"
              />
            </div>

            <div>
              <Label
                htmlFor="file"
                className="text-gray-700 dark:text-gray-300"
              >
                Upload File (Image or PDF)
              </Label>
              <Input
                id="file"
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileUpload}
                className="bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowUploadDialog(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitUpload}
                className="bg-green-600 hover:bg-green-700 text-white"
                disabled={
                  !uploadData.name ||
                  !uploadData.date ||
                  !uploadData.file
                }
              >
                Upload
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog
        open={showViewDialog}
        onOpenChange={setShowViewDialog}
      >
        <DialogContent className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-gray-800 dark:text-gray-200">
              {viewType === "prescription"
                ? "PRESCRIPTION"
                : "LAB REPORTS"}
            </DialogTitle>
          </DialogHeader>

          <div className="py-4">
            {filteredRecords.length > 0 ? (
              <div className="space-y-3">
                {filteredRecords.map((record) => (
                  <div
                    key={record.id}
                    className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-600"
                  >
                    <div className="flex-1">
                      <span className="text-gray-800 dark:text-gray-200">
                        {record.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-gray-600 dark:text-gray-400">
                        {record.date}
                      </div>
                      {record.file ? (
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewFile(record)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDownloadFile(record)}
                            className="text-green-600 hover:text-green-800"
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">No file</span>
                      )}
                    </div>
                  </div>
                ))}
                <div className="text-center py-8 text-gray-500">
                  (Same for{" "}
                  {viewType === "prescription"
                    ? "Lab Report"
                    : "Prescription"}
                  )
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No {viewType}s uploaded yet
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}