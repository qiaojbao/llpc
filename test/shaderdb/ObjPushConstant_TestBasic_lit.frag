#version 450

layout(binding = 1, std140, push_constant) uniform PushConstant
{
   vec4 m1;
   vec4 m2;
   vec4 m3;
   vec4 m4;
   vec4 m5;
   vec4 m6;
   vec4 m7;
   vec4 m8;
   vec4 m9;
   vec4 m10;
   vec4 m11;
   vec4 m12;
   vec4 m13;
   vec4 m14;
   vec4 m15;
   vec4 m16;
   vec4 m17;
   vec4 m18;
   vec4 m19;
   vec4 m20;
} pushConst;

layout(location = 0) out vec4 o1;

void main()
{
    o1 = pushConst.m5 + pushConst.m10;
}
// BEGIN_SHADERTEST
/*
; RUN: amdllpc -spvgen-dir=%spvgendir% -v %gfxip %s | FileCheck -check-prefix=SHADERTEST %s
; SHADERTEST-LABEL: {{^// LLPC.*}} SPIR-V lowering results
; SHADERTEST:  [[V0:%.*]] = call {{.*}} @llpc.call.desc.load.spill.table.ptr
; SHADERTEST:  [[V1:%.*]] = getelementptr {{.*}} addrspace(4)* [[V0]], i64 0, i64 64
; SHADERTEST:  [[V2:%.*]] = bitcast {{.*}} [[V1]]
; SHADERTEST:  load <4 x float>, <4 x float> addrspace(4)* [[V2]], align 16
; SHADERTEST:  [[V11:%.*]] = getelementptr {{.*}} addrspace(4)* [[V0]], i64 0, i64 144
; SHADERTEST:  [[V12:%.*]] = bitcast {{.*}} [[V11]]
; SHADERTEST:  load <4 x float>, <4 x float> addrspace(4)* [[V12]], align 16

; SHADERTEST: AMDLLPC SUCCESS
*/
// END_SHADERTEST