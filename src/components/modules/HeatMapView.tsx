import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';

// 扩展Leaflet类型以支持heat layer
declare module 'leaflet' {
  function heatLayer(
    latlngs: Array<[number, number, number]>,
    options?: any
  ): L.Layer;
}

interface HeatMapViewProps {
  title?: string;
  height?: string;
}

export function HeatMapView({ title = 'Carbon Emission Heatmap', height = '500px' }: HeatMapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // 新加坡国立大学(NUS)的坐标
    const NUS_CENTER: [number, number] = [1.2966, 103.7764];

    // 初始化地图
    const map = L.map(mapRef.current).setView(NUS_CENTER, 15);

    // 添加OpenStreetMap瓦片层
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    // 生成NUS校园内的模拟热力图数据
    // 格式: [纬度, 经度, 强度]
    const heatmapData: Array<[number, number, number]> = [
      // 主图书馆区域 - 高人流量
      [1.2966, 103.7726, 0.9],
      [1.2968, 103.7728, 0.85],
      [1.2970, 103.7730, 0.88],
      [1.2964, 103.7724, 0.82],
      
      // 工程学院区域 - 中高人流量
      [1.2990, 103.7750, 0.75],
      [1.2992, 103.7752, 0.78],
      [1.2994, 103.7754, 0.72],
      [1.2988, 103.7748, 0.70],
      
      // 科学学院区域 - 中等人流量
      [1.2945, 103.7765, 0.65],
      [1.2947, 103.7767, 0.68],
      [1.2943, 103.7763, 0.62],
      [1.2949, 103.7769, 0.66],
      
      // 艺术与社会科学学院 - 中等人流量
      [1.2935, 103.7745, 0.60],
      [1.2937, 103.7747, 0.63],
      [1.2933, 103.7743, 0.58],
      [1.2939, 103.7749, 0.61],
      
      // 商学院区域 - 中高人流量
      [1.2920, 103.7750, 0.70],
      [1.2922, 103.7752, 0.73],
      [1.2918, 103.7748, 0.68],
      [1.2924, 103.7754, 0.71],
      
      // 学生活动中心/食堂区域 - 最高人流量
      [1.3005, 103.7735, 0.95],
      [1.3007, 103.7737, 1.0],
      [1.3009, 103.7739, 0.92],
      [1.3003, 103.7733, 0.90],
      [1.3001, 103.7731, 0.88],
      
      // 宿舍区域 - 中低人流量
      [1.3025, 103.7720, 0.55],
      [1.3027, 103.7722, 0.58],
      [1.3023, 103.7718, 0.52],
      [1.3029, 103.7724, 0.56],
      
      // 体育中心区域 - 中等人流量
      [1.3040, 103.7700, 0.63],
      [1.3042, 103.7702, 0.66],
      [1.3038, 103.7698, 0.60],
      [1.3044, 103.7704, 0.64],
      
      // 医学院区域 - 中等人流量
      [1.2880, 103.7810, 0.67],
      [1.2882, 103.7812, 0.70],
      [1.2878, 103.7808, 0.64],
      [1.2884, 103.7814, 0.68],
      
      // 研究中心区域 - 低中人流量
      [1.2950, 103.7800, 0.50],
      [1.2952, 103.7802, 0.53],
      [1.2948, 103.7798, 0.48],
      [1.2954, 103.7804, 0.51],
      
      // 停车场/交通枢纽 - 高人流量
      [1.2975, 103.7780, 0.80],
      [1.2977, 103.7782, 0.83],
      [1.2973, 103.7778, 0.78],
      [1.2979, 103.7784, 0.81],
      
      // 公交车站周围 - 高人流量
      [1.2960, 103.7740, 0.85],
      [1.2962, 103.7742, 0.88],
      [1.2958, 103.7738, 0.82],
      [1.2964, 103.7744, 0.86],
      
      // 零散的其他区域
      [1.2900, 103.7770, 0.45],
      [1.2910, 103.7760, 0.48],
      [1.2985, 103.7790, 0.55],
      [1.2995, 103.7720, 0.52],
      [1.3015, 103.7745, 0.60],
      [1.3030, 103.7755, 0.57],
    ];

    // 创建热力图层
    const heatLayer = (L as any).heatLayer(heatmapData, {
      radius: 25,
      blur: 15,
      maxZoom: 17,
      max: 1.0,
      gradient: {
        0.0: 'green',
        0.3: 'yellow',
        0.5: 'orange',
        0.7: 'red',
        1.0: 'darkred'
      }
    }).addTo(map);

    // 添加图例说明
    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = function() {
      const div = L.DomUtil.create('div', 'info legend');
      div.style.backgroundColor = 'white';
      div.style.padding = '10px';
      div.style.borderRadius = '5px';
      div.style.boxShadow = '0 0 15px rgba(0,0,0,0.2)';
      div.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 5px;">Activity Level</div>
        <div style="display: flex; align-items: center; margin-bottom: 3px;">
          <div style="width: 20px; height: 20px; background: darkred; margin-right: 5px; border-radius: 3px;"></div>
          <span>Very High</span>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 3px;">
          <div style="width: 20px; height: 20px; background: red; margin-right: 5px; border-radius: 3px;"></div>
          <span>High</span>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 3px;">
          <div style="width: 20px; height: 20px; background: orange; margin-right: 5px; border-radius: 3px;"></div>
          <span>Medium</span>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 3px;">
          <div style="width: 20px; height: 20px; background: yellow; margin-right: 5px; border-radius: 3px;"></div>
          <span>Low</span>
        </div>
        <div style="display: flex; align-items: center;">
          <div style="width: 20px; height: 20px; background: green; margin-right: 5px; border-radius: 3px;"></div>
          <span>Very Low</span>
        </div>
      `;
      return div;
    };
    legend.addTo(map);

    mapInstanceRef.current = map;

    // 清理函数
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <div 
        ref={mapRef} 
        style={{ height, width: '100%' }} 
        className="rounded-lg border border-gray-300 shadow-sm"
      />
      <p className="text-sm text-gray-500 mt-2">
        Heatmap shows pedestrian activity density across NUS campus. Darker colors indicate higher foot traffic and carbon emissions.
      </p>
    </div>
  );
}
