import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Leaf,
  User,
  ArrowLeft,
  X,
  Calendar,
  MapPin,
  Clock,
} from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "./ThemeProvider";
import newLogoImage from "figma:asset/55a14cbbf289c9fde8c4c8ca4230c7f789072dbd.png";
import treeYogaImage from "figma:asset/5e9f3231a6281acf12a7cf1af3faf4647476c3e4.png";

interface AppointmentsPageProps {
  user: {
    id: string;
    name: string;
    email: string;
    userType: "patient" | "doctor";
  };
  onNavigate: (page: "patient-dashboard") => void;
  onLogout: () => void;
}

export function AppointmentsPage({
  user,
  onNavigate,
  onLogout,
}: AppointmentsPageProps) {
  const { theme } = useTheme();
  const [selectedAppointment, setSelectedAppointment] =
    useState<number | null>(null);
  const [showPrecautions, setShowPrecautions] = useState(false);
  const [precautionType, setPrecautionType] = useState<
    "pre" | "post" | null
  >(null);

  const appointments = [
    {
      id: 1,
      title: "Appointment 1",
      clinic: "Ayurveda Wellness Center",
      date: "Sept 20, 2025",
      time: "4:00 PM",
      doctor: "Dr. Priti More",
      treatment: "Vamana",
      status: "pending",
    }
    
  ];

  const precautionsData = {
    pre: {
      Vamana: [
        "Fast for 12 hours before treatment",
        "Avoid heavy meals and spicy food 24 hours prior",
        "Stay hydrated with warm water",
        "Get adequate rest the night before",
        "Inform doctor of any medications",
      ],
      Virechana: [
        "Follow preparatory diet (pathya) for 3-7 days",
        "Consume ghee as prescribed by doctor",
        "Avoid physical exertion",
        "Maintain regular sleep schedule",
        "Stay mentally calm and relaxed",
      ],
    },
    post: {
      Vamana: [
        "Rest completely for 2-3 hours after treatment",
        "Start with warm water after 1 hour",
        "Follow light diet (khichdi, rice) for 3 days",
        "Avoid cold foods and beverages",
        "Take prescribed medicines regularly",
      ],
      Virechana: [
        "Complete rest for remainder of the day",
        "Follow strict dietary guidelines (samsarjana krama)",
        "Gradually return to normal diet over 7 days",
        "Avoid stress and physical strain",
        "Monitor for any adverse reactions",
      ],
    },
  };

  const handlePrecautionSelect = (type: "pre" | "post") => {
    setPrecautionType(type);
    setShowPrecautions(true);
  };

  const getStatusColor = (status: string) => {
    return status === "pending"
      ? "bg-yellow-500"
      : "bg-green-500";
  };

  const getTreatmentProgress = (treatmentName: string) => {
    // Map treatments to progress (this would come from actual progress data)
    const progressMap: { [key: string]: number } = {
      Vamana: 1,
      Virechana: 2,
      Basti: 3,
      Nasya: 4,
      Raktamokshana: 5,
    };
    return progressMap[treatmentName] || 0;
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
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Appointments List */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                    My Appointments
                  </h2>

                  <div className="space-y-4">
                    {appointments.map((appointment, index) => (
                      <motion.div
                        key={appointment.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.2 * index,
                        }}
                        className="p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-green-400 dark:hover:border-green-400 transition-colors cursor-pointer bg-white/50 dark:bg-gray-700/50"
                        onClick={() =>
                          setSelectedAppointment(appointment.id)
                        }
                      >
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                          {appointment.title}
                        </h3>

                        <div className="flex items-center text-gray-600 dark:text-gray-400 mb-1">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{appointment.clinic}</span>
                        </div>

                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>
                            {appointment.date} at{" "}
                            {appointment.time}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Ayurveda Tree Design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 h-130 px-[30px] py-[0px] mx-[2px] my-[-2px] bg-[rgba(12,12,16,1)]">
              <CardContent className="p-8 flex items-center justify-center h-full mx-[18px] my-[0px]">
                <div className="text-center w-full">
                  <div className="mb-4 flex justify-center">
                    <img
                      src={treeYogaImage}
                      alt="Ayurveda Tree of Life"
                      className="w-100 h-100 object-contain opacity-80"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    Tree of Wellness
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Growing towards perfect health through
                    Ayurveda
                  </p>
                </div>
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

      {/* Appointment Detail Dialog */}
      <Dialog
        open={selectedAppointment !== null}
        onOpenChange={() => setSelectedAppointment(null)}
      >
        <DialogContent className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between text-gray-800 dark:text-gray-200">
              Appt No. {selectedAppointment}
            </DialogTitle>
          </DialogHeader>

          {selectedAppointment && (
            <div className="space-y-6 py-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">
                  Doctor name:
                </label>
                <p className="text-gray-800 dark:text-gray-200">
                  {
                    appointments.find(
                      (a) => a.id === selectedAppointment,
                    )?.doctor
                  }
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">
                  Clinic/Hospital name:
                </label>
                <p className="text-gray-800 dark:text-gray-200">
                  {
                    appointments.find(
                      (a) => a.id === selectedAppointment,
                    )?.clinic
                  }
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">
                    Treatment name:
                  </label>
                  <p className="text-gray-800 dark:text-gray-200">
                    {
                      appointments.find(
                        (a) => a.id === selectedAppointment,
                      )?.treatment
                    }
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">
                    Precautions
                  </label>
                  <Select
                    onValueChange={(value) =>
                      handlePrecautionSelect(
                        value as "pre" | "post",
                      )
                    }
                  >
                    <SelectTrigger className="w-32 bg-white/80 dark:bg-gray-700/80">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pre">
                        Pre-care
                      </SelectItem>
                      <SelectItem value="post">
                        Post-care
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">
                  Status of treatment:
                </label>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-4 h-4 rounded-full ${getStatusColor(appointments.find((a) => a.id === selectedAppointment)?.status || "")}`}
                  ></div>
                  <span className="text-gray-800 dark:text-gray-200 capitalize">
                    {
                      appointments.find(
                        (a) => a.id === selectedAppointment,
                      )?.status
                    }
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    (Progress step:{" "}
                    {getTreatmentProgress(
                      appointments.find(
                        (a) => a.id === selectedAppointment,
                      )?.treatment || "",
                    )}
                    /5)
                  </span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Precautions Dialog */}
      <Dialog
        open={showPrecautions}
        onOpenChange={() => setShowPrecautions(false)}
      >
        <DialogContent className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-gray-800 dark:text-gray-200">
              {precautionType === "pre"
                ? "Pre-treatment"
                : "Post-treatment"}{" "}
              Precautions
            </DialogTitle>
          </DialogHeader>

          {selectedAppointment && precautionType && (
            <div className="py-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                {
                  appointments.find(
                    (a) => a.id === selectedAppointment,
                  )?.treatment
                }
              </h3>

              <div className="space-y-3">
                {(
                  precautionsData[precautionType][
                    appointments.find(
                      (a) => a.id === selectedAppointment,
                    )
                      ?.treatment as keyof typeof precautionsData.pre
                  ] || []
                ).map((precaution, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {precaution}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <Button
                  onClick={() => setShowPrecautions(false)}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Got it
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}