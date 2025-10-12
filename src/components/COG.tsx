import { useState } from "react";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const { BaseLayer, Overlay } = LayersControl;

const COGMap = () => {
  const [center] = useState<[number, number]>([7.8023, 6.7333]); // Nigeria center
  const [zoom] = useState(8);

  // Your COG layers — one for each dataset
  const cogLayers = [
    {
      name: "Sentinel 1",
      url: "https://huggingface.co/spaces/marquis07/titiler-geo/resolve/main/Sentinel1_VV_2022_COG.tif",
    },
    {
      name: "Cropland 2021",
      url: "https://huggingface.co/spaces/marquis07/titiler-geo/resolve/main/Cropland_ESA_WorldCover_2021_COG.tif",
    },
    {
      name: "Flooded NDVI",
      url: "https://huggingface.co/spaces/marquis07/titiler-geo/resolve/main/FloodDriven_NDVI_Loss_COG.tif",
    },
    {
      name: "Flooded Cropland",
      url: "https://huggingface.co/spaces/marquis07/titiler-geo/resolve/main/Flooded_Cropland_2022_COG.tif",
    },
    {
      name: "WaterBodies",
      url: "https://huggingface.co/spaces/marquis07/titiler-geo/resolve/main/Flooded_Areas_2022_COG.tif",
    },
    {
      name: "Cropland (PreFlood)",
      url: "https://huggingface.co/spaces/marquis07/titiler-geo/resolve/main/NDVI_Cropland_PostFlood_COG.tif",
    },
    {
      name: "Cropland (PostFlood)",
      url: "https://huggingface.co/spaces/marquis07/titiler-geo/resolve/main/NDVI_Cropland_PostFlood_COG.tif",
    },
    {
      name: "Cropland Change",
      url: "https://huggingface.co/spaces/marquis07/titiler-geo/resolve/main/NDVI_Cropland_Change_COG.tif",
    },
  ];

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "100vh", width: "100%" }}
    >
      <LayersControl position="topright">
        {/* Base map */}
        <BaseLayer checked name="OpenStreetMap">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
          />
        </BaseLayer>

        {/* COG Layers */}
        {cogLayers.map((layer, i) => (
          <Overlay
            key={i}
            name={layer.name}
            checked={i === 0} // ✅ Show the first layer (Cropland 2021) by default
          >
            <TileLayer
              url={`https://titiler.xyz/cog/tiles/{z}/{x}/{y}.png?url=${encodeURIComponent(
                layer.url
              )}`}
              attribution={`© ${layer.name}`}
            />
          </Overlay>
        ))}
      </LayersControl>
    </MapContainer>
  );
};

export default COGMap;
