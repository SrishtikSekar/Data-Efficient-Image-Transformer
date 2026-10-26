import {finalizePresentation} from '/home/gsrishtik/.codex/plugins/cache/openai-primary-runtime/presentations/26.1024.11018/skills/presentations/container_tools/artifact_tool_utils.mjs';
const workspaceDir='/home/gsrishtik/Desktop/Data-Efficient-Image-Transformer';
const skill='/home/gsrishtik/.codex/plugins/cache/openai-primary-runtime/presentations/26.1024.11018/skills/presentations';
const result=await finalizePresentation({
 workspaceDir,
 candidatePath:workspaceDir+'/.presentation-build/candidate.pptx',
 finalPath:workspaceDir+'/outputs/presentation/deit_lt_fabricated_demonstration_left_aligned.pptx',
 pythonExecutable:'/home/gsrishtik/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3',
 integrityValidatorPath:skill+'/container_tools/inspect_presentation_package_integrity.py',
 layoutValidatorPath:skill+'/container_tools/inspect_presentation_layout_geometry.py',
 explicitTotalSlideCount:17,
 requiredNativeTableOwnerSlides:[3,9,10,12,14,16],
 requiredNativeChartOwnerSlides:[2,11,13,15],
 materializeLiteralChartWorkbooks:true,
 nativeChartTargetApplication:'powerpoint',
 fontPolicy:{basis:'design',families:['DejaVu Sans']},
 layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-bullet-geometry','--validate-heading-fit',...[3,9,10,12,14,16].flatMap(n=>['--require-native-table-slide',String(n)])],
 verifyArtifactToolImport:true,
 receiptPath:workspaceDir+'/.presentation-build/validation-left-aligned.json'
});
console.log(JSON.stringify(result));
