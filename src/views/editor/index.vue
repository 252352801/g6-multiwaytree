<template>
  <div class="treeEditor">
    <div class="treeEditor__toolsPanel"></div>
    <div class="treeEditor__graphPanel" ref="graphPanel">
      <div></div>
    </div>
    <div class="treeEditor__propsPanel"></div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
// const centerDialogVisible = ref(false);
import G6, { IPoint, Item } from "@antv/g6";
// root node
const graphPanel = ref<any>(null);
const dragEnter = {
  fillOpacity: 0.5,
  stroke: "#056de8",
};
onMounted(() => {
  G6.registerNode("root", {
    draw: (cfg, group) => {
      const size = [80, 30];
      const keyShape = group.addShape("rect", {
        attrs: {
          width: size[0],
          height: size[1],
          x: -size[0] / 2,
          y: -size[1] / 2,
          fill: "rgb(19, 33, 92)",
          radius: 5,
        },
        draggable: true,
        name: "root-keyshape",
      });
      group.addShape("text", {
        attrs: {
          text: `${cfg.ratio}%`,
          fill: "rgba(255, 255, 255, 0.85)",
          fontSize: 6,
          x: 10 - size[0] / 2,
          y: 3,
        },
        draggable: true,
        name: "ratio-shape",
      });
      group.addShape("text", {
        attrs: {
          text: `${cfg.label}`,
          fill: "rgba(255, 255, 255, 0.85)",
          fontSize: 9,
          x: -6,
          y: 0,
        },
        style: {
          fill: "#fff",
          fontSize: 14,
        },
        draggable: true,
        name: "label-shape",
      });
      group.addShape("line", {
        attrs: {
          x1: -6,
          x2: 35,
          y1: 2,
          y2: 2,
          stroke: "rgba(255, 255, 255, 0.85)",
          lineWidth: 0.5,
        },
        draggable: true,
        name: "divider-shape",
      });
      group.addShape("text", {
        attrs: {
          text: `${cfg.subLabel}`,
          fill: "rgba(255, 255, 255, 0.65)",
          fontSize: 6,
          x: -6,
          y: 10,
        },
        draggable: true,
        name: "sublabel-shape",
      });
      return keyShape;
    },
  });

  // level1 node
  G6.registerNode(
    "level1node",
    {
      draw: (cfg, group) => {
        const size = [60, 40];
        const keyShape = group.addShape("rect", {
          attrs: {
            width: size[0],
            height: size[1],
            x: -size[0] / 2,
            y: -size[1] / 2,
            fill: "rgb(213, 225, 247)",
            radius: 5,
          },
          draggable: true,
          name: "level1node-keyshape",
        });
        group.addShape("text", {
          attrs: {
            text: `${cfg.label}`,
            fill: "rgba(19, 33, 92, 0.65)",
            fontSize: 6,
            x: 0,
            y: -6,
            textAlign: "center",
          },
          hover: {
            // hover 状态为 true 时的样式
            fill: "#d3adf7",
          },
          draggable: true,
          name: "label-shape",
        });
        group.addShape("text", {
          attrs: {
            text: `${cfg.subLabel}`,
            fill: "rgba(19, 33, 92, 0.65)",
            fontSize: 8,
            x: 0,
            y: 6,
            fontWeight: 800,
            textAlign: "center",
          },
          draggable: true,
          name: "sublabel-shape",
        });
        group.addShape("rect", {
          attrs: {
            x: -12,
            y: 8,
            width: 25,
            height: 8,
            radius: 4,
            fill: cfg.increase ? "rgb(127, 193, 193)" : "rgb(220, 124, 125)",
          },
          draggable: true,
          name: "ratio-box",
        });
        group.addShape("text", {
          attrs: {
            text: `${cfg.ratio}%`,
            fill: "rgba(255, 255, 255, 0.85)",
            fontSize: 6,
            x: 0,
            y: 9,
            textAlign: "center",
            textBaseline: "top",
          },
          draggable: true,
          name: "ratio-shape",
        });
        // edge end
        // group.addShape("line", {
        //   attrs: {
        //     x1: -size[0] / 2,
        //     x2: -size[0] / 2 + 6,
        //     y1: 0,
        //     y2: 0,
        //     lineWidth: 1,
        //     stroke: "rgb(19, 33, 92)",
        //   },
        // });
        // group.addShape("circle", {
        //   attrs: {
        //     r: 2,
        //     x: -size[0] / 2 + 6,
        //     y: 0,
        //     fill: "rgb(19, 33, 92)",
        //   },
        // });
        return keyShape;
      },
      update: undefined,
    },
    "rect"
  );

  // other node
  G6.registerNode(
    "othernode",
    {
      draw: (cfg, group) => {
        const size = [100, 30];
        const keyShape = group.addShape("rect", {
          attrs: {
            width: size[0],
            height: size[1],
            x: -size[0] / 2,
            y: -size[1] / 2,
            fill: "rgb(213, 225, 247)",
            radius: 5,
          },
          draggable: true,
          name: "level1node-keyshape",
        });
        group.addShape("text", {
          attrs: {
            text: `${cfg.label}`,
            fill: "rgba(19, 33, 92, 0.65)",
            fontSize: 6,
            x: 10 - size[0] / 2,
            y: -2,
            textAlign: "left",
          },
          nodeStateStyles: {
            hover: {
              // hover 状态为 true 时的样式
              fill: "red",
            },
          },
          draggable: true,
          name: "label-shape",
        });
        group.addShape("text", {
          attrs: {
            text: `${cfg.subLabel}`,
            fill: "rgba(19, 33, 92, 0.65)",
            fontSize: 8,
            fontWeight: 800,
            x: 10 - size[0] / 2,
            y: 8,
            textAlign: "left",
          },
          draggable: true,
          name: "sublabel-shape",
        });
        group.addShape("rect", {
          attrs: {
            x: 12,
            y: -4,
            width: 25,
            height: 8,
            radius: 4,
            fill: cfg.increase ? "rgb(127, 193, 193)" : "rgb(220, 124, 125)",
          },
          draggable: true,
          name: "ratio-box",
        });
        group.addShape("text", {
          attrs: {
            text: `${cfg.ratio}%`,
            fill: "rgba(255, 255, 255, 0.85)",
            fontSize: 6,
            x: 18,
            y: -3,
            textAlign: "left",
            textBaseline: "top",
          },
          draggable: true,
          name: "ratio-shape",
        });
        if (cfg.operator) {
          group.addShape("rect", {
            attrs: {
              x: -8,
              y: 27,
              width: 16,
              height: 16,
              lineWidth: 1,
              stroke: "#aaa",
              lineDash: [2, 1],
              opacity: 0,
            },
            name: "operator-box",
          });
          group.addShape("circle", {
            attrs: {
              r: 6,
              x: 0,
              y: 35,
              fill: "rgba(240, 90, 109, 0.15)",
            },
            name: "operator-circle",
          });
          group.addShape("text", {
            attrs: {
              text: cfg.operator,
              x: 0,
              y: 34,
              fontSize: 12,
              fill: "rgba(240, 90, 109, 0.85)",
              textAlign: "center",
              textBaseline: "middle",
            },
            name: "operator-symbol",
          });
        }

        // edge end
        // group.addShape("line", {
        //   attrs: {
        //     x1: -size[0] / 2,
        //     x2: -size[0] / 2 + 6,
        //     y1: 0,
        //     y2: 0,
        //     lineWidth: 1,
        //     stroke: "rgb(19, 33, 92)",
        //   },
        // });
        // group.addShape("circle", {
        //   attrs: {
        //     r: 2,
        //     x: -size[0] / 2 + 6,
        //     y: 0,
        //     fill: "rgb(19, 33, 92)",
        //   },
        // });
        return keyShape;
      },
      update: undefined,
    },
    "rect"
  );

  // edge
  G6.registerEdge(
    "round-poly",
    {
      getControlPoints: (cfg) => {
        const { startPoint, endPoint } = cfg;
        return [
          startPoint,
          {
            x: startPoint?.x,
            y: endPoint?.y,
          },
          endPoint,
        ] as IPoint[];
      },
    },
    "polyline"
  );

  const data = {
    id: "root",
    label: "利息收入",
    subLabel: "3,283.456",
    ratio: 3,
    children: [
      {
        id: "child-a",
        label: "平均利息",
        subLabel: "9%",
        ratio: 1,
        increase: true,
      },
      {
        id: "child-a1",
        label: "平均利息",
        subLabel: "9%",
        ratio: 11,
        increase: true,
        children: [
          {
            id: "child-b-aa1",
            label: "投放金额",
            subLabel: "2,385,124",
            ratio: 171,
            increase: true,
            operator: "-",
          },
        ],
      },
      {
        id: "child-b",
        label: "贷款余额",
        subLabel: "1,789,567",
        ratio: 23,
        increase: true,
        children: [
          {
            id: "child-b-a",
            label: "投放金额",
            subLabel: "2,385,124",
            ratio: 17,
            increase: true,
            operator: "-",
          },
          {
            id: "child-b-b",
            label: "还款金额",
            subLabel: "595,557",
            ratio: 12,
            increase: true,
          },
        ],
      },
      {
        id: "child-c",
        label: "还款期限",
        subLabel: "7",
        ratio: 23,
        increase: false,
      },
    ],
  };

  G6.Util.traverseTree(
    data,
    (subtree: { level: number; children: any[]; type: string }) => {
      if (subtree.level === undefined) subtree.level = 0;
      subtree.children?.forEach(
        (child) => (child.level = subtree.level || 0 + 1)
      );
      switch (subtree.level) {
        case 0:
          subtree.type = "root";
          break;
        case 1:
          subtree.type = "level1node";
          break;
        default:
          subtree.type = "othernode";
      }
    }
  );
  function getAllChildren(item: Item) {
    const res: Item[] = [];
    const pustChildren = function (it: Item) {
      const children = it.get("children");
      if (Array.isArray(children)) {
        children.forEach((c) => {
          res.push(c);
          pustChildren(c);
        });
      }
    };
    pustChildren(item);
    return res;
  }
  function cloneMovingModel(model: any) {
    const newModel = {
      ...model,
      id: model.id + "_moving",
    };
    if (Array.isArray(newModel.children)) {
      newModel.children = newModel.children.map(cloneMovingModel);
    }
    return newModel;
  }
  function clearModelIdMovingFlag(model: any) {
    model.id.replace(/(_moving)$/, "");
    if (Array.isArray(model.children)) {
      model.children.forEach(clearModelIdMovingFlag);
    }
  }
  const graphPanelEl = graphPanel.value;
  const width = graphPanelEl.scrollWidth;
  const height = (graphPanelEl.scrollHeight || 500) - 30;
  const graph = new G6.TreeGraph({
    container: graphPanelEl,
    width,
    height,
    fitView: true,
    animate: true, // Boolean，切换布局时是否使用动画过度，默认为 false
    animateCfg: {
      duration: 300, // Number，一次动画的时长
      easing: "linearEasing", // String，动画函数，可选项：''
    },
    layout: {
      type: "compactBox",
      direction: "LR",
      getHGap: function getVGap() {
        return 20;
      },
    },
    defaultEdge: {
      // type: "round-poly",
      type: "line",
      sourceAnchor: 0,
      targetAnchor: 1,
      style: {
        radius: 8,
        stroke: "rgb(19, 33, 92)",
      },
    },
    defaultNode: {
      anchorPoints: [
        [0.9, 0.5],
        [0, 0.5],
      ],
    },
    nodeStateStyles: {
      hover: {
        fill: "#fff",
        shadowBlur: 30,
        shadowColor: "#ddd",
      },
      operatorhover: {
        "operator-box": {
          opacity: 1,
        },
      },
      dragEnter,
    },
    modes: {
      default: [
        "zoom-canvas",
        "drag-canvas",
        "collapse-expand",
        // "drag-node",
        "click-select",
      ],
      edit: [
        "zoom-canvas",
        "drag-canvas",
        // "drag-node",
        {
          type: "drag-node",
          enableDelegate: true,
        },
        "click-select",
        "drag-combo",
      ],
    },
  });
  graph.setMode("edit");
  graph.on("node:mouseenter", (e) => {
    if (e.target.get("name")?.includes("operator")) {
      graph.setItemState(e.item as Item, "operatorhover", true);
    } else {
      graph.setItemState(e.item as Item, "hover", true);
    }
  });
  graph.on("node:mouseleave", (e) => {
    graph.setItemState(e.item as Item, "operatorhover", false);
    graph.setItemState(e.item as Item, "hover", false);
  });
  let dragItem: any = null;
  let dragTarget: Item | null = null;
  graph.on("node:dragstart", (e) => {
    dragItem = e.item;
  });
  graph.on("node:dragenter", (e) => {
    console.log(e);
    if (dragItem) {
      const dragItemParent = dragItem.get("parent");
      const target = e.item as Item;
      const dragItemChildren = getAllChildren(dragItem);
      if (
        target !== dragItemParent &&
        dragItemChildren.indexOf(target) === -1
      ) {
        graph.setItemState(target, "dragEnter", true);
        dragTarget = target;
      }
    }
  });
  graph.on("node:dragleave", (e) => {
    graph.setItemState(e.item as Item, "dragEnter", false);
    dragTarget = null;
  });
  graph.on("node:drop", () => {
    console.log("drop");
    if (dragItem && dragTarget) {
      // 改变层级
      const moveItemId = dragItem.getID();
      const moveItemModel = dragItem.getModel();
      const childrenModel = cloneMovingModel(moveItemModel);
      graph.addChild(childrenModel, dragTarget.getID());
      setTimeout(() => {
        // 动画时间过之后再移除
        graph.removeChild(moveItemId);
        graph.refreshPositions();
        dragTarget && clearModelIdMovingFlag(dragTarget.getModel());
      }, 300);
    }
  });
  graph.on("node:dragend", () => {
    if (dragItem && !dragTarget) {
      // 拖拽后排序
      const dragItemParent = dragItem.get("parent");
      if (!dragItemParent) {
        return;
      }
      const dragItemParentModel = dragItemParent.getModel();
      const children = dragItemParentModel.children;
      console.log("children", children);
      if (Array.isArray(children) && children.length > 1) {
        const oldSortIds = children.map((c) => c.id);
        children.sort((a, b) => a.y - b.y);
        const newSortIds = children.map((c) => c.id);
        if (JSON.stringify(oldSortIds) !== JSON.stringify(newSortIds)) {
          dragItemParentModel.children = children;
          graph.updateChildren(
            dragItemParentModel.children,
            dragItemParentModel.id
          );
        }
      }
    }
  });
  graph.data(data);
  graph.render();
  console.log("graph", graph);
});
</script>
<style lang="scss">
.treeEditor {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
}
.treeEditor__toolsPanel {
  width: 185px;
  height: calc(100% - 40px);
  border-right: 1px solid #dadce0;
  padding: 10px;
}
.treeEditor__graphPanel {
  flex: 1;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2QwZDBkMCIgb3BhY2l0eT0iMC4yIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZDBkMGQwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=");
  background-repeat: "repeat";
}
.treeEditor__propsPanel {
  width: 250px;
  background-color: #fafafa;
  border-left: 1px solid #dadce0;
}
</style>
