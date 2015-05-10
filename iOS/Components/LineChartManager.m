#import "RCTViewManager.h"
#import "RCTConvert+PNChart.h"

#import "PNChart.h"

@interface LineChartManager : RCTViewManager
@end

@implementation LineChartManager

RCT_EXPORT_MODULE();

- (UIView *)view
{
  PNLineChart *lineChart = [[PNLineChart alloc] initWithFrame:CGRectMake(0, 0, SCREEN_WIDTH, 200.0)];
  return lineChart;
}

RCT_EXPORT_VIEW_PROPERTY(yLabels, NSArray)
RCT_EXPORT_VIEW_PROPERTY(xLabels, NSArray)
RCT_CUSTOM_VIEW_PROPERTY(chartData, PNLineChartData, PNLineChart)
{
  [view setChartData:json ? [RCTConvert PNLineChartData:json] : defaultView.chartData];
  [view strokeChart];
}

@end
