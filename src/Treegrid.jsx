import { useEffect } from 'react'
import tasks from './data.json'

const Treegrid = () => {
  const id = 'Treegrid'

  const columns = [
    {
      Name: 'rowNumber',
      MaxWidth: 56,
      Type: 'Int',
    },
    {
      Name: 'title',
      MinWidth: 300,
    },
    {
      Name: 'plannedStartDate',
      Type: 'Date',
      Format: 'd.M.yyyy HH:mm',
    },
    {
      Name: 'plannedEndDate',
      Type: 'Date',
      Format: 'd.M.yyyy HH:mm',
    },
    {
      Name: 'ganttAncestors',
      type: 'Html',
      CanHide: 0,
      Visible: 0,
    },
    {
      Name: 'predecessors',
      CanEdit: 0,
      CanSort: 0,
      Visible: 0,
    },
  ]
  const rightColumns = [
    {
      Name: 'Gantt',
      Type: 'Gantt',
      GanttEdit: 'Main,Dependency,DependencyTypes,DependencyLags',
      GanttDependencyColor: 3,
      GanttAncestors: 'ganttAncestors',
      GanttIncorrectDependencies: 0, // no dependencies are marked as incorrect dependencies
      GanttCorrectDependencies: 0, // treegrid should not auto correct dependencies
      GanttZoom: 'Months, Weeks and Days',
      GanttZoomList: zoomList,
      GanttSmoothZoom: 2, // controls whether to adjust the GanttWidth of each column with zoom
      GanttStart: 'plannedStartDate',
      GanttEnd: 'plannedEndDate',
      GanttHeight: 16,
      GanttClass: 'Blue',
      GanttShowBounds: 0,
    },
  ]

  window.layout = {
    Cfg: {
      id: 'Test',
      Style: 'white',
      MainCol: 'title',
      Dragging: 1,
      ScrollLeft: 0,
      LeftScrollLeft: 0,
      RightScrollLeft: 0,
      LeftCanResize: 4,
      RightCanResize: 4,
      SuppressCfg: 1,
    },
    Cols: columns,
    RightCols: rightColumns,
    Toolbar: {
      Cells05: 'Zoom',
      ZoomType: 'SelectGanttZoom',
      ZoomWidth: '150',
      ZoomHtmlPrefix: 'Zoom <b>',
      ZoomHtmlPostfix: '</b>',
    },
  }
  /** Only create grid once at the beginning */
  useEffect(() => {
    if (!window.Grids[id]) {
      window.TreeGrid(
        {
          Layout: { Script: 'layout' },
          Data: { Data: { Body: [tasks] } },
          Debug:
            // @ts-ignore
            process.env.NODE_ENV === 'development' ? 'Problem,Error' : '',
        },
        id
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /** Reload grid for data changes */
  useEffect(() => {
    if (window.Grids[id]) {
      window.Grids[id].Source.Data.Data.Body = [tasks]
      window.Grids[id]?.ReloadBody()
    }
  }, [tasks, id])

  return <div id={id} style={{ height: 'calc(100vh - 124px)' }} />
}

export const zoomList = [
  {
    Name: 'Years and Quarters',
    GanttUnits: 'M3',
    GanttDataUnits: 'M3',
    GanttSize: '0',
    GanttChartRound: 'y',
    GanttHeader1: 'y#yyyy',
    GanttHeader2: 'M3#MMMMM',
    GanttWidth: 64,
  },
  {
    Name: 'Quarters and Months',
    GanttUnits: 'M',
    GanttDataUnits: 'M',
    GanttSize: '0',
    GanttChartRound: 'M3',
    GanttHeader1: 'M3#MMMMM yyyy',
    GanttHeader2: 'M#MMM',
    GanttWidth: 64,
  },
  {
    Name: 'Months, Weeks and Days',
    GanttUnits: 'd',
    GanttDataUnits: 'd',
    GanttChartRound: 'M',
    GanttSize: '0',
    GanttHeader1: 'M#MMMM yyyy',
    GanttHeader2: 'w1#"wk "dddddddd',
    GanttHeader3: 'd#dd',
  },
  {
    Name: 'Weeks and Days',
    GanttUnits: 'd',
    GanttDataUnits: 'd',
    GanttChartRound: 'w1',
    GanttSize: 'y5',
    GanttHeader1: 'w1#"wk "dddddddd, yyyy',
    GanttHeader2: 'd#dd',
    GanttHeader3: 'd#ddddd',
  },
  {
    Name: 'Days and Hours',
    GanttUnits: 'm30',
    GanttDataUnits: 'h',
    GanttChartRound: 'h',
    GanttSize: 'y',
    GanttHeader1: 'h12#ddd, dd MMM yy',
    GanttHeader2: 'h#HH',
    GanttWidth: 16,
  },
  {
    Name: 'Hours and Quarters',
    GanttUnits: 'm15',
    GanttDataUnits: 'm',
    GanttChartRound: 'h',
    GanttSize: 'M',
    GanttHeader1: 'h3#ddd, dd MMM yy',
    GanttHeader2: 'h# hh tt',
    GanttHeader3: 'm15#mm',
    GanttWidth: 24,
  },
]

export default Treegrid
