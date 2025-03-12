import { useRef, useState, useCallback } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Stage, Grid } from "@react-three/drei";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Mesh, MeshStandardMaterial } from "three";
import {
  FileUp,
  Maximize2,
  Minimize2,
  Grid as GridIcon,
  ZoomIn,
  ZoomOut,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

function Model({ model }) {
  if (model) {
    model.traverse((child) => {
      if (child.isMesh) {
        child.material = new MeshStandardMaterial({
          color: "blue",
          metalness: 0.5,
          roughness: 0.5,
        });
      }
    });
  }
  return <primitive object={model} />;
}

function Controls({ controls }) {
  const moveCamera = (direction) => {
    if (controls.current) {
      const { object } = controls.current;
      const step = 1;
      if (direction === "left") object.position.x -= step;
      if (direction === "right") object.position.x += step;
      if (direction === "up") object.position.y += step;
      if (direction === "down") object.position.y -= step;
    }
  };

  return (
    <div className="flex gap-2 p-4 bg-white border-t flex-wrap justify-center">
      <button
        onClick={() => controls.current?.reset()}
        className="p-2 bg-gray-200 rounded-lg"
      >
        Reset
      </button>
      <button
        onClick={() => controls.current?.dollyOut(1.2)}
        className="p-2 bg-gray-200 rounded-lg"
      >
        <ZoomIn />
      </button>
      <button
        onClick={() => controls.current?.dollyIn(1.2)}
        className="p-2 bg-gray-200 rounded-lg"
      >
        <ZoomOut />
      </button>
      <button
        onClick={() => moveCamera("up")}
        className="p-2 bg-gray-200 rounded-lg"
      >
        <ArrowUp />
      </button>
      <button
        onClick={() => moveCamera("down")}
        className="p-2 bg-gray-200 rounded-lg"
      >
        <ArrowDown />
      </button>
      <button
        onClick={() => moveCamera("left")}
        className="p-2 bg-gray-200 rounded-lg"
      >
        <ArrowLeft />
      </button>
      <button
        onClick={() => moveCamera("right")}
        className="p-2 bg-gray-200 rounded-lg"
      >
        <ArrowRight />
      </button>
    </div>
  );
}

export default function ModelViewer() {
  const [model, setModel] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const fileInputRef = useRef(null);
  const containerRef = useRef(null);
  const controlsRef = useRef(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const arrayBuffer = e.target?.result;
      try {
        let loadedModel;
        if (fileExtension === "stl") {
          const loader = new STLLoader();
          const geometry = loader.parse(arrayBuffer);
          loadedModel = new Mesh(geometry);
        } else if (fileExtension === "obj") {
          const loader = new OBJLoader();
          const text = new TextDecoder().decode(arrayBuffer);
          loadedModel = loader.parse(text);
        }
        if (loadedModel) {
          setModel(loadedModel);
        }
      } catch (error) {
        console.error("Error loading model:", error);
        alert("Error loading model. Please try a different file.");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const toggleGrid = useCallback(() => {
    setShowGrid((prev) => !prev);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full flex flex-col rounded-lg overflow-hidden border border-gray-200 bg-white ${isFullscreen ? "fixed inset-0 z-50" : ""
        }`}
    >
      <div className="flex justify-between items-center p-4 bg-white shadow-sm border-b">
        <div className="flex items-center gap-4">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FileUp size={20} /> Upload Model
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".stl,.obj"
            onChange={handleFileUpload}
            className="hidden"
          />
          {fileName && (
            <span className="text-gray-600 font-medium">
              Current file: {fileName}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleGrid}
            className={`p-2 rounded-lg transition-colors ${showGrid
                ? "bg-gray-100 text-gray-900"
                : "text-gray-500 hover:bg-gray-100"
              }`}
            title="Toggle Grid"
          >
            <GridIcon size={20} />
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>
        </div>
      </div>
      <div className="flex-1 bg-gray-50">
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Stage environment="city" intensity={0.5}>
            {model && <Model model={model} />}
          </Stage>
          {showGrid && <Grid args={[15, 15]} infiniteGrid />}
          <OrbitControls ref={controlsRef} makeDefault />
        </Canvas>
      </div>
      {/* Controls should always be visible, so it's outside of the fullscreen condition */}
      <Controls controls={controlsRef} />
    </div>
  );
}