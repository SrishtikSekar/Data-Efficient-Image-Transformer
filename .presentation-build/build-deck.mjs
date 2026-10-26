export const FONT='DejaVu Sans';
export function addIF50Slides(p){
 if(p.slides.items.length!==15)throw Error('Expected the current 15-slide deck');
 const old=p.slides.items.map(s=>s.id);
 let s=base(p,'CIFAR-10-LT: full results at IF = 50',12,'Results',resultFooter('Table 3'));
 const ten=table(s,[['Model','Top-1','Top-5','Macro-F1','Head','Mid','Tail'],['ResNet-32','79.2','92.7','77.2','89.2','79.2','69.2'],['ViT','70.0','89.5','68.0','80.0','70.0','60.0'],['DeiT-III','68.1','88.8','66.1','78.1','68.1','58.1'],['DeiT-Final','80.6','98.2','79.8','88.5','75.5','79.5']],60,190,1160,280,[270,140,140,170,140,150,150],23);
 ten.cells.block({row:4,column:0,rowCount:1,columnCount:7}).assign({fill:'#E8ECFA',textStyle:{color:C.blue}});
 text(s,'All values are percentages on the balanced test set.',60,490,1160,34,23,C.muted);
 point(s,'+1.4 points in top-1','DeiT-Final reports 80.6% versus 79.2% for the best baseline, ResNet-32.',60,545,550);
 point(s,'+10.3 points on the tail','Tail accuracy reaches 79.5% versus 69.2% for ResNet-32, while its mid accuracy is lower.',660,545,550);
 // Shorten the two text groups so they fit above the source footer.
 for(const q of s.shapes.items){if(q.position.top===592){q.position={...q.position,top:588,height:56};q.text.style={typeface:FONT,fontSize:21,color:C.muted,insets:0};}}
 note(s,'Source: updated report Table 3, CIFAR-10-LT with imbalance factor50. Full metric values are reproduced exactly as supplied. Top1 lead80.6-79.2=1.4 points; tail79.5-69.2=10.3; mid75.5-79.2=-3.7; head88.5-89.2=-0.7. DeiT-Final leads top1,top5,macroF1 and tail in the reported table, while CNN leads head and mid. All comparisons remain descriptive because underlying experimental evidence was not independently verified.');
 const a=s.id;
 s=base(p,'CIFAR-100-LT: full results at IF = 50',14,'Results',resultFooter('Table 5'));
 const hundred=table(s,[['Model','Top-1','Top-5','Macro-F1','Head','Mid','Tail'],['ResNet-32','46.1','81.1','44.1','56.1','44.1','36.1'],['ViT','38.9','78.6','36.9','48.9','36.9','28.9'],['DeiT-III','44.0','80.4','42.0','54.0','42.0','34.0'],['DeiT-Final','50.4','76.2','49.1','66.5','50.5','28.5']],60,190,1160,280,[270,140,140,170,140,150,150],23);
 hundred.cells.block({row:4,column:0,rowCount:1,columnCount:7}).assign({fill:'#E8ECFA',textStyle:{color:C.blue}});
 text(s,'All values are percentages on the balanced test set.',60,490,1160,34,23,C.muted);
 point(s,'+4.3 points in top-1','DeiT-Final reports 50.4% versus 46.1% for ResNet-32, with gains in head and mid accuracy.',60,545,550);
 point(s,'Tail and top-5 trade-offs','Tail drops 7.6 points (28.5% versus 36.1%). Top-5 drops 4.9 points (76.2% versus 81.1%).',660,545,550);
 for(const q of s.shapes.items){if(q.position.top===592){q.position={...q.position,top:588,height:56};q.text.style={typeface:FONT,fontSize:21,color:C.muted,insets:0};}}
 note(s,'Source: updated report Table 5, CIFAR-100-LT with imbalance factor50. Full metric values follow the PDF. DeiTFinal vsCNN: top1 +4.3 points,top5 -4.9,macroF1 +5.0,head +10.4,mid +6.4,tail -7.6. The supplied report therefore does not support a claim that DeiT-Final improves every subgroup at IF50. These are reported values with synthetic CSV provenance and require independent experimental verification.');
 const b=s.id;
 p.slides.reorder([...old.slice(0,11),a,old[11],b,...old.slice(12)].map(id=>'sl/'+id));
 p.slides.items.forEach((slide,i)=>{const counter=slide.shapes.items.find(q=>/^\d{2} \/ 15$/.test(q.name));if(!counter)throw Error('Counter missing');counter.text=String(i+1).padStart(2,'0')+' / 17';counter.name=String(i+1).padStart(2,'0')+' / 17';});
 return {slides:p.slides.items.length,addedSlides:[12,14]};
}
const C={paper:'#F8F7F3',ink:'#202B38',muted:'#64707C',line:'#DDDCD5',blue:'#3D5DD2',teal:'#4A7772',coral:'#B66D4F',light:'#ECEFF8',dark:'#162C3E'};
const COLORS=['#B66D4F','#8391A5','#4A7772','#3D5DD2'];
const names=['ResNet-32','ViT','DeiT-III','DeiT-Final'];
const report='/home/gsrishtik/Downloads/final_paper_updated.pdf';
const provenance='Baseline provenance: workspace CSVs label values synthetic. Reported results need verification.';
function text(s,t,x,y,w,h,size=24,color=C.ink,bold=false,align='left'){
 const q=s.shapes.add({geometry:'textbox',name:t.slice(0,65),position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0}});
 q.text=t;q.text.style={typeface:FONT,fontSize:size,color,bold,alignment:align,verticalAlignment:'top',insets:0,autoFit:'none',wrap:'square'};return q;
}
function rule(s,y=650){s.shapes.add({geometry:'line',position:{left:60,top:y,width:1160,height:0},fill:'none',line:{fill:C.line,width:1}});}
function note(s,body){s.speakerNotes.text=body+'\n\nSource: '+report+' (user-supplied project report). Results are reproduced as reported, not independently validated. The repository baseline CSVs carry synthetic provenance. No synthetic demo heatmaps are used as model evidence.';}
function base(p,title,n,section,foot=''){
 const s=p.slides.add({width:1280,height:720});s.background.fill=C.paper;
 text(s,section.toUpperCase(),60,33,1100,22,14,C.teal,true);
 text(s,title,60,75,1160,100,43,C.ink,true);
 rule(s);text(s,foot||'Training vision transformers on long-tailed data',60,665,1085,35,13,C.muted);
 text(s,String(n).padStart(2,'0')+' / 15',1140,665,80,25,13,C.muted,false,'right');return s;
}
function body(s,t,x,y,w,h=90,size=24){return text(s,t,x,y,w,h,size);}
function point(s,title,copy,x,y,w){text(s,title,x,y,w,34,26,C.ink,true);text(s,copy,x,y+47,w,98,23,C.muted);}
function node(s,title,x,y,w,h=100,color=C.blue){const q=s.shapes.add({geometry:'rect',name:title,position:{left:x,top:y,width:w,height:h},fill:'#F0F1ED',line:{fill:color,width:1.5}});q.text=title;q.text.style={typeface:FONT,fontSize:21,color:C.ink,alignment:'center',verticalAlignment:'middle',insets:10,autoFit:'none'};return q;}
function connect(s,a,b,from='right',to='left'){s.shapes.connect(a,b,{kind:'elbow',fromSide:from,toSide:to,line:{fill:'#8B98A4',width:2},tail:{type:'triangle',width:'sm',length:'sm'}});}
function table(s,values,x,y,w,h,widths,fs=22){
 const t=s.tables.add({rows:values.length,columns:values[0].length,left:x,top:y,width:w,height:h,values,columnWidths:widths});
 t.borders.assign({fill:C.line,width:.6,style:'solid'});
 t.cells.block({row:0,column:0,rowCount:values.length,columnCount:values[0].length}).assign({textStyle:{typeface:FONT,fontSize:fs,color:C.ink},margins:{left:12,right:10,top:10,bottom:8},anchor:'center'});
 for(let r=0;r<values.length;r++)for(let c=0;c<values[0].length;c++){const cell=t.getCell(r,c);cell.fill=r===0?C.dark:r%2===0?'#F0F0EA':C.paper;cell.text.style={typeface:FONT,fontSize:fs,color:r===0?'#FFFFFF':C.ink,bold:r===0,alignment:c===0?'left':'center',verticalAlignment:'middle'};}
 return t;
}
function chart(s,categories,series,x,y,w,h,max=100,legend=true){
 const q=s.charts.add('bar',{position:{left:x,top:y,width:w,height:h},categories,series:series.map((values,i)=>({name:names[i],values,fill:COLORS[i],valuesFormatCode:'0.0'})),hasLegend:legend,legend:{position:'bottom',textStyle:{fontSize:17,fill:C.ink}},barOptions:{direction:'column',grouping:'clustered',gapWidth:65},xAxis:{textStyle:{fontSize:20,fill:C.ink},line:{fill:C.line,width:1},majorGridlines:null},yAxis:{min:0,max,majorUnit:20,numberFormatCode:'0',textStyle:{fontSize:16,fill:C.muted},majorGridlines:{fill:'#E1E3E3',width:1}},dataLabels:{showValue:true,position:'outEnd',numberFormatCode:'0.0',textStyle:{fontSize:16,fill:C.ink}},chartFill:C.paper,plotAreaFill:C.paper});
 for(const style of [q.legend.textStyle,q.dataLabels.textStyle,q.xAxis.textStyle,q.yAxis.textStyle])style.typeface=FONT;
 return q;
}
function resultFooter(tables){return 'Source: updated report, '+tables+'. Values as reported. '+provenance;}
export function buildDeck(p){
 if(p.slides.items.length)throw Error('Expected an empty presentation');
 // 01
 let s=p.slides.add({width:1280,height:720});s.background.fill=C.dark;
 text(s,'IIIT KOTTAYAM     IOE-414 DEEP LEARNING',60,55,1140,28,18,'#B3C6D1',true);
 text(s,'Training vision transformers\non long-tailed data',60,163,1140,180,64,'#FFFFFF',true);
 text(s,'Architectures, methodology, and reported results\nA study of DeiT-LT',63,385,1070,90,31,'#D4DFE4');
 text(s,'ResNet-32     ViT     DeiT-III     DeiT-LT / DeiT-Final',63,520,1100,38,24,'#AFC4F5');
 text(s,'G Srishtik Sekar   ·   S N Ghosh   ·   Aditya BR   ·   Nishanth',63,605,1120,30,19,'#D4DFE4');
 text(s,'Minor project report, October 2026',63,655,900,25,15,'#A6BAC5');
 text(s,'01 / 15',1140,655,80,25,14,'#A6BAC5',false,'right');
 note(s,'Based on the updated project report. Group members and course affiliation follow its cover. DeiT-Final is the report’s name for the full model trained with the DeiT-LT recipe. This deck describes the architecture and reported comparisons. It does not establish that the reported results arose from verified training runs.');
 // 02
 s=base(p,'Why long-tailed data is difficult',2,'Problem and motivation');
 text(s,'CIFAR-10-LT class sizes',60,180,650,35,25,C.ink,true);
 const counts=ifactor=>Array.from({length:10},(_,i)=>Math.floor(5000*Math.pow(1/ifactor,i/9)));
 const ch=s.charts.add('line',{position:{left:60,top:230,width:710,height:350},categories:Array.from({length:10},(_,i)=>String(i)),series:[{name:'IF = 100',values:counts(100),line:{fill:C.blue,width:3}},{name:'IF = 50',values:counts(50),line:{fill:C.coral,width:3}}],hasLegend:true,legend:{position:'bottom',textStyle:{fontSize:18}},xAxis:{title:'Class rank',textStyle:{fontSize:18}},yAxis:{min:0,max:5000,majorUnit:1000,textStyle:{fontSize:17},majorGridlines:{fill:C.line,width:1}},chartFill:C.paper,plotAreaFill:C.paper});
 for(const st of [ch.legend.textStyle,ch.xAxis.textStyle,ch.yAxis.textStyle,ch.xAxis.title.textStyle])st.typeface=FONT;
 point(s,'Unequal exposure','Frequent classes dominate the training signal. Tail classes provide few examples.',830,190,390);
 point(s,'Spatial structure','A plain ViT must learn spatial relationships from data. A CNN supplies local structure through convolution.',830,365,390);
 text(s,'Goal: train from scratch while improving recognition of rare classes.',60,590,1150,40,24,C.teal,true);
 note(s,'Source: Problem Statement and Dataset Details, pp. 3–7. The line chart is calculated from the supplied class-size formula n_i = floor(n_max (1/IF)^(i/(C-1))), C=10 and n_max=5000. It is a dataset construction illustration, not a measured model result.');
 // 03
 s=base(p,'Benchmarks and evaluation protocol',3,'Data');
 table(s,[['Dataset','Classes','IF','Train images','Test images'],['CIFAR-10-LT','10','100 / 50','12,406 / 13,996','10,000'],['CIFAR-100-LT','100','100 / 50','10,847 / 12,608','10,000'],['ImageNet-LT','1,000','256','115,846','50,000']],60,180,1160,265,[300,150,160,280,270],23);
 point(s,'Balanced test sets','The report evaluates overall top-1, top-5 and macro-F1 on balanced test sets.',60,485,550);
 point(s,'Frequency groups','CIFAR uses fixed class-index groups. ImageNet-LT uses >100, 20–100 and <20 training images.',660,485,560);
 note(s,'Source: Dataset Details, Table 1 and Head, mid and tail groups, pp. 7–8. CIFAR-10 groups: classes 0–2 / 3–6 / 7–9. CIFAR-100 groups: 0–35 / 36–70 / 71–99. ImageNet-LT uses >100 / 20–100 / <20 training examples per class. CIFAR train totals follow Table 1 exactly; split files were not independently checked.');
 // 04
 s=base(p,'ResNet-32: convolution and residual learning',4,'Model 1');
 text(s,'CIFAR architecture: 3 stages, 5 residual blocks per stage',60,180,1150,40,27,C.teal,true);
 const rn=[node(s,'RGB input\n32 × 32',60,260,145),node(s,'3 × 3 conv\n16 channels',235,260,155),node(s,'Stage 1\n5 blocks / 16',420,260,165),node(s,'Stage 2\n5 blocks / 32',615,260,165),node(s,'Stage 3\n5 blocks / 64',810,260,165),node(s,'Global pool\nLinear head',1005,260,205)];
 rn.slice(0,-1).forEach((q,i)=>connect(s,q,rn[i+1]));
 text(s,'Residual block:  y = ReLU(F(x) + shortcut(x))',60,411,1140,55,31,C.ink,true);
 point(s,'Architecture role','Shared local filters and residual connections provide a strong baseline for small images.',60,505,550);
 point(s,'Training method','Cross-entropy, SGD at learning rate 0.1, momentum 0.9 and cosine learning-rate decay.',660,505,550);
 note(s,'Source: Models compared in this project, p. 6. The editable diagram depicts the standard CIFAR ResNet-32, consistent with ResNetCIFAR in the repository notebooks: stem 16 channels; three stages with 5 basic blocks each at 16/32/64 channels; global average pooling and a linear classifier. Stage transitions downsample. This architecture diagram specifically describes the CIFAR baseline. The report’s ImageNet architecture needs checkpoint verification, as discussed on slide 14.');
 // 05
 s=base(p,'ViT: image patches become a token sequence',5,'Model 2');
 text(s,'224 × 224 input, 16 × 16 patches, 192-dimensional embeddings',60,180,1160,38,26,C.teal,true);
 const vt=[node(s,'RGB image\n224 × 224',60,258,170),node(s,'Patch embedding\n196 patches',260,258,200),node(s,'CLS token +\nposition embedding',490,258,220),node(s,'8 encoder blocks\n3 attention heads',740,258,230),node(s,'CLS output\nLinear classifier',1000,258,210)];
 vt.slice(0,-1).forEach((q,i)=>connect(s,q,vt[i+1]));
 text(s,'Each encoder block uses self-attention and an MLP with residual connections.',60,412,1150,68,28,C.ink,true);
 point(s,'Training method','AdamW, label smoothing and a 10-epoch warm-up. The baseline uses no CNN teacher.',60,510,550);
 point(s,'Main limitation','Few examples per rare class can leave patch relationships poorly learned.',660,510,550);
 note(s,'Source: Vision Transformer basics, pp. 4–5, and Models compared in this project, p. 6. Patch count is calculated as (224/16)^2 = 196, giving 197 tokens including CLS. The report specifies 8 blocks, 3 heads and embedding dimension 192. Architecture and optimization summary follows the project baseline, not the large ViT-B configuration of every cited paper.');
 // 06
 s=base(p,'DeiT-III: a different transformer training recipe',6,'Model 3');
 text(s,'Same reported transformer scale as ViT, with no teacher',60,180,1150,38,27,C.teal,true);
 const dt=[node(s,'LayerNorm',60,265,150),node(s,'Multi-head\nself-attention',240,265,190),node(s,'LayerScale +\nstochastic depth',460,265,220),node(s,'Residual\naddition',710,265,170),node(s,'Norm + MLP\nLayerScale + residual',910,265,300)];
 dt.slice(0,-1).forEach((q,i)=>connect(s,q,dt[i+1]));
 text(s,'The block repeats eight times before the classification head.',60,405,1150,44,27,C.ink,true);
 point(s,'Regularization','Stochastic depth and 3-Augment: grayscale, solarization and blur.',60,498,550);
 point(s,'Optimization','Binary cross-entropy with the DeiT-III-style recipe. LayerScale scales each residual branch.',660,498,550);
 note(s,'Source: Models compared in this project, p. 6, and deit3_training_cifar.ipynb. Diagram abbreviates two pre-norm residual sublayers. Attention and MLP branches both use LayerScale and stochastic depth in the local implementation. The project describes a DeiT-III-style baseline, not an exact implementation claim for every detail of the original DeiT III paper. DeiT-3 and DeiT-III refer to this baseline.');
 // 07
 s=base(p,'DeiT-LT: one student, two learning signals',7,'Model 4');
 text(s,'The report names its full DeiT-LT-recipe model “DeiT-Final”',60,172,1160,38,25,C.teal,true);
 const image=node(s,'Strongly\naugmented image',60,295,185,105);
 const teacher=node(s,'Frozen CNN teacher',300,225,240,85,C.coral);
 const student=node(s,'ViT student\nCLS + DIST tokens',300,425,240,95);
 const hard=node(s,'Teacher hard label\ny_t = argmax g(x)',590,225,240,85,C.coral);
 const heads=node(s,'CLS and DIST\nclassification heads',590,425,240,95);
 const dist=node(s,'DIST loss\nDeferred re-weighting',930,225,280,85);
 const cls=node(s,'CLS loss\nTrue class label',930,425,280,95);
 connect(s,image,teacher);connect(s,image,student);connect(s,teacher,hard);connect(s,student,heads);connect(s,hard,dist);connect(s,heads,cls);connect(s,heads,dist,'top','bottom');
 text(s,'At inference, the student combines its CLS and DIST outputs.',60,575,1150,42,28,C.ink,true);
 note(s,'Source: Method Overview with Architecture, Figure 1, pp. 5–6. Strong augmentations serve both the teacher and the student. CLS learns from true labels. DIST learns hard teacher labels with deferred re-weighting. This diagram condenses the two-headed training flow. The report states that the two heads are averaged at inference. The arrow from both heads to the distillation loss denotes the DIST contribution specifically; only the CLS head uses the true-label CE loss. No separate CNN teacher runs at inference.');
 // 08
 s=base(p,'The DeiT-LT methodology',8,'Training mechanisms');
 const mechanisms=[['01','OOD distillation','Train the teacher with mild augmentation. Distill on strong Mixup / CutMix images to encourage local image structure.'],['02','Deferred re-weighting','Activate class weights late in training on the DIST loss. Rare classes receive more weight.'],['03','SAM-trained teacher','The base method uses SAM with a long-tail loss to encourage flatter minima and lower-rank teacher features.']];
 mechanisms.forEach((r,i)=>{const y=181+i*117;text(s,r[0],60,y,65,45,31,C.blue,true);text(s,r[1],150,y,360,50,27,C.ink,true);text(s,r[2],540,y,670,92,23,C.muted);});
 text(s,'L = ½ CE(f_CLS(x), y) + ½ DRW(f_DIST(x), y_t)',60,556,1150,48,31,C.blue,true);
 text(s,'The method aims for complementary head- and tail-class behavior.',60,609,1150,30,21,C.muted);
 note(s,'Source: What DeiT-LT changes, pp. 5–6. Definitions: y_t = argmax_i g(x)_i; DRW = -w_{y_t} log p_DIST(y_t); before epoch K all weights are 1. The report defines effective class counts e_y=(1-beta^N_y)/(1-beta), and w_y=1/[1+(e_y-1)1(epoch>=K)]. It attributes low-rank features to the SAM-trained teacher. These are method mechanisms described by the source, not ablation results independently demonstrated in this repository. The report mentions a stronger PaCo + SAM teacher in its base-paper comparison; that is not established as the local teacher configuration.');
 // 09
 s=base(p,'Training budgets and comparison limits',9,'Experimental setup');
 table(s,[['Model','CIFAR-LT epochs','ImageNet-LT epochs'],['ResNet-32','100','1,400'],['ViT','100','1,400'],['DeiT-III','100','100'],['DeiT-Final','1,200','1,400']],60,180,1160,305,[440,360,360],24);
 point(s,'Shared baseline settings','The report specifies batch size 64 and seed 42 for the baselines on a Kaggle GPU.',60,505,550);
 point(s,'Unequal compute','On CIFAR, DeiT-Final receives 12× the epochs. Architecture effects and training-budget effects remain confounded.',660,505,550);
 note(s,'Source: Models compared in this project, pp. 6–7, and Discussion, p. 12. The report states that baselines use 100 epochs, with ImageNet-LT exceptions of 1400 epochs for ResNet-32 and ViT. DeiT-Final uses 1200 CIFAR and 1400 ImageNet epochs. Thus the table infers ImageNet DeiT-III=100 from the general statement. The report does not clearly supply all DeiT-Final optimizer, batch size, GPU type, repeated seeds, or checkpoint provenance details. Do not attribute every performance difference to architecture or distillation.');
 // 10
 s=base(p,'Reported top-1 accuracy across five settings',10,'Results',resultFooter('Tables 2–6'));
 const top=[['Dataset / IF',...names],['CIFAR-10 / 100','74.5','62.5','59.0','78.3'],['CIFAR-10 / 50','79.2','70.0','68.1','80.6'],['CIFAR-100 / 100','38.2','34.9','38.0','46.8'],['CIFAR-100 / 50','46.1','38.9','44.0','50.4'],['ImageNet-LT','41.3','35.0','42.3','46.5']];
 const t=table(s,top,60,180,1160,350,[330,215,185,215,215],23);t.cells.block({row:1,column:4,rowCount:5,columnCount:1}).assign({fill:'#E8ECFA',textStyle:{bold:true,color:C.blue}});
 text(s,'DeiT-Final ranks first in the supplied report’s top-1 tables.',60,560,1160,40,28,C.blue,true);
 text(s,'Lead over the best baseline: +3.8, +1.4, +8.6, +4.3 and +4.2 percentage points.',60,610,1160,32,21,C.muted);
 note(s,'Source: Tables 2–6, pp. 9–11. All numeric values are percentages. Baseline order and reported values follow the updated PDF rather than the separate target-reference CSV created in this chat. Differences are calculated as DeiT-Final top-1 minus the maximum baseline top-1 in each row. Values are report summaries, not independently validated experimental evidence. Workspace CSV provenance explicitly marks metrics synthetic.');
 // 11
 s=base(p,'CIFAR-10-LT: the reported tail gain is largest',11,'Results',resultFooter('Tables 2–3'));
 text(s,'IF = 100, group accuracy (%)',60,177,780,40,25,C.ink,true);
 chart(s,['Head','Mid','Tail'],[[84.5,64.5,45.0],[72.5,62.5,52.5],[69.0,59.0,49.0],[87.2,72.6,76.9]],60,228,790,358,100);
 point(s,'+31.9 points','Reported tail gain over ResNet-32: 76.9% versus 45.0%.',900,190,315);
 point(s,'IF = 50','Top-1 reaches 80.6% versus 79.2% for ResNet-32, a 1.4-point lead.',900,380,315);
 text(s,'Interpretation: this pattern is consistent with the method’s tail-class objective.',60,605,1160,34,24,C.teal,true);
 note(s,'Source: Table 2 (IF100) and Table 3 (IF50), pp. 9–10. Every chart value is copied from the PDF, including the source baseline subgroup inconsistency discussed on slide 14. Tail gain is 76.9-45.0=31.9 percentage points. At IF50, top1 gain is 80.6-79.2=1.4 points. These patterns are compatible with the mechanism, but cannot establish causality or experimental validity without verified checkpoints, predictions, and comparable schedules.');
 // 12
 s=base(p,'CIFAR-100-LT: overall gains hide tail trade-offs',12,'Results',resultFooter('Tables 4–5'));
 text(s,'IF = 100, group accuracy (%)',60,177,780,40,25,C.ink,true);
 chart(s,['Head','Mid','Tail'],[[48.2,36.2,28.2],[44.9,32.9,24.9],[48.0,36.0,28.0],[63.8,47.5,24.8]],60,228,790,358,100);
 point(s,'+8.6 points overall','Top-1: 46.8% versus 38.2% for ResNet-32 at IF = 100.',900,190,315);
 point(s,'Tail trade-off','Tail drops 3.4 points: 24.8% versus 28.2%. Top-5 also falls from 78.4% to 73.5%.',900,380,315);
 text(s,'Interpretation: head and mid classes account for the reported improvement here.',60,605,1160,34,24,C.teal,true);
 note(s,'Source: Tables 4–5, p. 10. IF100 reported macroF1: 36.2,32.9,36.0,45.0 for ResNet32,ViT,DeiTIII,DeiTFinal. Reported top5:78.4,77.2,78.3,73.5. DeiT-Final top1 gain46.8-38.2=8.6 points; tail24.8-28.2=-3.4; top5 73.5-78.4=-4.9. At IF50 DeiT-Final50.4 vsCNN46.1 (+4.3) top1, tail28.5 vs36.1 (-7.6). Improved top1 does not imply that every metric or subgroup improves.');
 // 13
 s=base(p,'ImageNet-LT: a more balanced reported profile',13,'Results',resultFooter('Table 6'));
 text(s,'Head, mid and tail accuracy (%)',60,177,780,40,25,C.ink,true);
 chart(s,['Head','Mid','Tail'],[[57.9,44.4,28.2],[54.4,27.9,7.8],[63.3,36.8,17.0],[54.5,44.5,29.5]],60,228,790,358,100);
 point(s,'46.5% top-1','Highest reported overall score. The tail gain is +21.7 points over ViT, but +1.3 over ResNet-32.',900,185,315);
 point(s,'Other metrics','DeiT-III reports the best top-5 (81.9%) and macro-F1 (46.3%).',900,385,315);
 text(s,'DeiT-Final’s head-to-tail gap is 25.0 points, versus 46.3 for DeiT-III.',60,605,1160,34,24,C.teal,true);
 note(s,'Source: Table 6 and ImageNet-LT discussion, p. 11. DeiT-Final top1 46.5, top5 70.2, macroF1 44.5; CNN41.3/70.5/46.0; ViT35.0/58.0/34.0; DeiTIII42.3/81.9/46.3. Reported tail gains29.5-7.8=21.7 overViT,29.5-28.2=1.3 overCNN. Head-to-tail gaps calculated54.5-29.5=25.0;63.3-17=46.3. Highest top1 does not imply highest macroF1. Class membership/checkpoint evidence remain necessary to validate these reported summaries.');
 // 14
 s=base(p,'Base-paper comparison and evidence limits',14,'Interpretation',resultFooter('Table 7 and Discussion'));
 table(s,[['IF = 100','CIFAR-10-LT','CIFAR-100-LT'],['DeiT-Final, project report','78.3','46.8'],['DeiT-LT, cited base-paper value','80.8','49.3'],['Reported gap (percentage points)','−2.5','−2.5']],60,180,1160,215,[620,270,270],22);
 text(s,'What limits the conclusion',60,430,1160,35,27,C.ink,true);
 text(s,'Training budget: 100 versus 1,200 epochs on CIFAR prevents a controlled method comparison.',60,478,1160,52,22,C.muted);
 text(s,'Metric consistency: CIFAR-10 IF100 CNN group scores imply 64.65% top-1, versus the table’s 74.5%.',60,540,1160,55,22,C.muted);
 text(s,'Synthetic CSVs and missing checkpoints leave the reported results unverified.',60,600,1160,40,21,C.coral,true);
 note(s,'Source: Table 7, p.12, comparing the project report with its cited smallest DeiT-LT configuration from Rangwani et al.2024. This is the report’s comparison, not an independent verification of the base paper. Different teacher recipes, batch sizes and model details limit direct equivalence. The report’s proposed reasons are hypotheses, not tested ablations. Consistency check derived from the stated balanced CIFAR10 test set and class grouping sizes3/4/3: (3*84.5+4*64.5+3*45.0)/10=64.65, which conflicts with top1=74.5. Rounded group values cannot explain a9.85-point difference. At IF50 the analogous CNN weighted average79.2 agrees. The source report labels the ImageNet CNN ResNet32, while repository make_model selects ResNet50 for non-CIFAR non-smoke runs; actual checkpoint architecture therefore needs verification. No checkpoints were found in the inspected repository.');
 // 15
 s=base(p,'Conclusions and next experiments',15,'Inference');
 point(s,'Methodological insight','DeiT-LT combines CNN distillation with separate CLS and DIST supervision to target the long tail.',60,185,550);
 point(s,'Reported outcome','The report ranks DeiT-Final first in top-1 across five settings. CIFAR-100 tail and ImageNet macro-F1 show trade-offs.',660,185,550);
 point(s,'Evidence needed','Checkpoints, prediction files and training logs must support every reported metric before publication.',60,390,550);
 point(s,'Fair comparison','Match training budgets, repeat independent seeds, and ablate OOD distillation, DRW and the teacher recipe.',660,390,550);
 text(s,'Key references: Rangwani et al. (2024), He et al. (2016), Dosovitskiy et al. (2021), Touvron et al. (2022)',60,600,1160,40,18,C.muted);
 note(s,'Sources: supplied report Discussion and References, pp.12–15. Key references as cited there: Rangwani,H.,Mondal,P.,Mishra,M.,Asokan,A.R.,&Babu,R.V.(2024). DeiT-LT: Distillation Strikes Back for Vision Transformer Training on Long-Tailed Datasets. CVPR. https://doi.org/10.48550/arXiv.2404.02900 ; He,K.,Zhang,X.,Ren,S.,&Sun,J.(2016). Deep Residual Learning for Image Recognition. CVPR ; Dosovitskiy,A.,et al.(2021). An Image is Worth16x16 Words. ICLR ; Touvron,H.,Cord,M.,&Jégou,H.(2022). DeiT III: Revenge of the ViT. ECCV. The architecture and method explanation can stand independently of the reported results. The dataset-level rankings remain descriptive until independent experimental evidence resolves synthetic provenance and numeric inconsistencies.');
 if(p.slides.items.length!==15)throw Error('Slide count mismatch');
 return {slides:15};
}
