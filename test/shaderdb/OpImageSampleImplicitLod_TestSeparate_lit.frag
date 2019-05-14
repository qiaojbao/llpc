#version 450 core
layout(set = 0, binding = 0) uniform sampler samp;
layout(set = 0, binding = 1) uniform texture2D tex2D;
layout(location = 0) out vec4 oColor;

void main()
{
    oColor = texture(sampler2D(tex2D, samp), vec2(0, 0));
}


// BEGIN_SHADERTEST
/*
; RUN: amdllpc -spvgen-dir=%spvgendir% -v %gfxip %s | FileCheck -check-prefix=SHADERTEST %s

; SHADERTEST-LABEL: {{^// LLPC}} SPIRV-to-LLVM translation results
; SHADERTEST: <4 x float> @spirv.image.sample.f32.2D({{.*}}, <2 x float> zeroinitializer, {{.*}})

; SHADERTEST-LABEL: {{^// LLPC}} SPIR-V lowering results
; SHADERTEST: call <8 x i32>{{.*}}@llpc.call.desc.load.resource.v8i32
; SHADERTEST: call <4 x i32>{{.*}}@llpc.call.desc.load.sampler.v4i32
; SHADERTEST: call <4 x float> @llpc.image.sample.f32.2D{{.*}}({{.*}}, <2 x float> zeroinitializer, {{.*}})

; SHADERTEST-LABEL: {{^// LLPC}} pipeline patching results
; SHADERTEST: load <4 x i32>, <4 x i32> addrspace(4)* %{{[0-9]*}}
; SHADERTEST: load <8 x i32>, <8 x i32> addrspace(4)* %{{[0-9]*}}
; SHADERTEST: call <4 x float> @llvm.amdgcn.image.sample.2d.v4f32.f32({{.*}}, float 0.000000e+00, float 0.000000e+00, {{.*}})

; SHADERTEST: AMDLLPC SUCCESS
*/
// END_SHADERTEST