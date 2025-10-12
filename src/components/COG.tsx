import { useState } from "react";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";

const { BaseLayer, Overlay } = LayersControl;

const COG = () => {
  const [center] = useState<[number, number]>([9.082, 8.6753]); // Nigeria center
  const [zoom] = useState(6);

  // Your COG layers — one for each dataset
  const cogLayers = [
    {
      name: "Cropland 2021",
      url: "https://huggingface.co/spaces/marquis07/titiler-geo/resolve/main/Cropland_ESA_WorldCover_2021_COG.tif",
    },
    {
      name: "Water Bodies",
      url: "https://huggingface.co/spaces/marquis07/titiler-geo/resolve/main/Water_ESA_WorldCover_2021_COG.tif",
    },
    {
      name: "Built-up Areas",
      url: "https://huggingface.co/spaces/marquis07/titiler-geo/resolve/main/Builtup_ESA_WorldCover_2021_COG.tif",
    },
    // Add more layers here...
  ];

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "100vh", width: "100%" }}
    >
      <LayersControl position="topright">
        <BaseLayer checked name="OpenStreetMap">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
          />
        </BaseLayer>

        {cogLayers.map((layer, i) => (
          <Overlay key={i} name={layer.name}>
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

export default COG;
