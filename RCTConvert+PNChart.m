#import "RCTConvert+PNChart.h"
#import <UIKit/UIKit.h>

@implementation RCTConvert(PNLineChart)

+ (NSArray *)PNLineChartData:(id)json
{
  NSMutableArray *result = [NSMutableArray arrayWithCapacity:[json count]];
  
  [json enumerateObjectsUsingBlock:^(id obj, NSUInteger idx, BOOL *stop) {

    NSArray *chartDataArray = [obj valueForKey:@"data"];
    PNLineChartData *chartData = [PNLineChartData new];
    chartData.getData = ^(NSUInteger index) {
      CGFloat yValue = [chartDataArray[index] floatValue];
      return [PNLineChartDataItem dataItemWithY:yValue];
    };

    NSDictionary *chartColor = [obj valueForKey:@"color"];
    float red = [[chartColor valueForKey:@"r"] floatValue];
    float green = [[chartColor valueForKey:@"g"] floatValue];
    float blue = [[chartColor valueForKey:@"b"] floatValue];
    float alpha = [[chartColor valueForKey:@"a"] floatValue];
    
    chartData.color = [UIColor colorWithRed: red / 255.0
                                      green: green / 255.0
                                       blue: blue / 255.0
                                      alpha: alpha];
    
    chartData.itemCount = [chartDataArray count];

    [result addObject:chartData];
  }];
  
  return result;
}

@end
